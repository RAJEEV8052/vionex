import {
  CallEndedEvent,
  CallTranscriptionReadyEvent,
  CallRecordingReadyEvent,
  CallSessionParticipantLeftEvent,
  CallSessionStartedEvent,
} from "@stream-io/node-sdk";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { agents, meetings } from "@/db/schema";
import { streamVideo } from "@/lib/stream-video";
import { inngest } from "@/inngest/client";

function verifySignatureWithSDK(body: string, signature: string): boolean {
  return streamVideo.verifyWebhook(body, signature);
}

export async function POST(request: NextRequest) {
  const signature = request.headers.get("x-signature");
  const apiKey = request.headers.get("x-api-key");

  if (!signature || !apiKey) {
    return NextResponse.json({ error: "Missing credentials" }, { status: 400 });
  }

  const body = await request.text();

  if (!verifySignatureWithSDK(body, signature)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const payload = JSON.parse(body);
  const eventType = payload.type;

  if (eventType === "call.session_started") {
    const event = payload as CallSessionStartedEvent;
    const meetingId = event.call.custom?.meetingId || event.call.id;

    if (!meetingId)
      return NextResponse.json({ error: "No ID" }, { status: 400 });

    const [existingMeeting] = await db
      .select()
      .from(meetings)
      .where(eq(meetings.id, meetingId));

    // Prevent duplicate joining if webhook retries
    if (!existingMeeting || existingMeeting.status === "active") {
      return NextResponse.json({ status: "already_active_ignored" });
    }

    await db
      .update(meetings)
      .set({ status: "active", startedAt: new Date() })
      .where(eq(meetings.id, meetingId));

    const [existingAgent] = await db
      .select()
      .from(agents)
      .where(eq(agents.id, existingMeeting.agentId));

    if (existingAgent) {
      try {
        const call = streamVideo.video.call("default", event.call.id);
        const realtimeClient = await streamVideo.video.connectOpenAi({
          call,
          openAiApiKey: process.env.OPENAI_API_KEY!,
          agentUserId: existingAgent.id,
        });

        await new Promise((resolve) => setTimeout(resolve, 1000));

        await realtimeClient.updateSession({
          instructions:
            existingAgent.instructions || "You are a helpful assistant.",
          modalities: ["text", "audio"],
          voice: "alloy",
          // Turn detection ensures the agent responds to your voice
          turn_detection: {
            type: "server_vad",
            threshold: 0.5,
            silence_duration_ms: 600,
          },
        });

        console.log("Agent successfully initialized with audio.");
      } catch (err) {
        console.error("AI Agent connection error:", err);
      }
    }
  } else if (eventType === "call.session_participant_left") {
    const event = payload as CallSessionParticipantLeftEvent;
    const meetingId = event.call_cid.split(":")[1];

    if (meetingId) {
      const call = streamVideo.video.call("default", meetingId);
      await call.end();
      await db
        .update(meetings)
        .set({ status: "completed" })
        .where(eq(meetings.id, meetingId));
    }
  }

  // NEW LOGIC: Handling Call End
  else if (eventType === "call.session_ended") {
    const event = payload as CallEndedEvent;
    const meetingId = event.call.custom?.meetingId || event.call.id;

    if (meetingId) {
      await db
        .update(meetings)
        .set({
          // Note: Using "completed" instead of "processing" to avoid DB Enum errors
          status: "completed",
          endedAt: new Date(),
        })
        .where(and(eq(meetings.id, meetingId), eq(meetings.status, "active")));
    }
  }

  // NEW LOGIC: Handling Transcripts
  else if (eventType === "call.transcription_ready") {
    const event = payload as CallTranscriptionReadyEvent;
    const meetingId = event.call_cid.split(":")[1];
    const [updatedMeeting] = await db
      .update(meetings)
      .set({ transcriptUrl: event.call_transcription.url })
      .where(eq(meetings.id, meetingId))
      .returning();
    if (!updatedMeeting) {
      return NextResponse.json({ error: "Meeting not found" }, { status: 404 });
    }
    await inngest.send({
      name: "meetings/processing",
      data: {
        meetingId: updatedMeeting.id,
        transcriptUrl: updatedMeeting.transcriptUrl,
      },
    });
  }

  // NEW LOGIC: Handling Recordings
  else if (eventType === "call.recording_ready") {
    const event = payload as CallRecordingReadyEvent;
    const meetingId = event.call_cid.split(":")[1];

    await db
      .update(meetings)
      .set({ recordingUrl: event.call_recording.url })
      .where(eq(meetings.id, meetingId));
  }

  return NextResponse.json({ status: "ok" });
}
