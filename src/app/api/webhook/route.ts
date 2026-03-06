import {
  CallSessionParticipantLeftEvent,
  CallSessionStartedEvent,
} from "@stream-io/node-sdk";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { agents, meetings } from "@/db/schema";
import { streamVideo } from "@/lib/stream-video";

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

        // This delay ensures the connection is ready before sending instructions
        await new Promise((resolve) => setTimeout(resolve, 1000));

        await realtimeClient.updateSession({
          instructions:
            existingAgent.instructions || "You are a helpful assistant.",
          modalities: ["text", "audio"],
          voice: "alloy",
          // ADD THIS SECTION BELOW
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

  return NextResponse.json({ status: "ok" });
}
