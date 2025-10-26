"use client";

import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ErrorState } from "@/components/error-state";
import { AgentIdViewHeader } from "../Components/agent-id-view-header";
import { GeneratedAvatar } from "@/components/generated-avatar";
import { Badge } from "@/components/ui/badge";
import { VideoIcon } from "lucide-react";
interface Props {
  agentId: string;
}
export const AgentIdView = ({ agentId }: Props) => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.agents.getOne.queryOptions({ id: agentId })
  );
  return (
    <div className=" flex-1 py-4 px-4 md:px-8 flex flex-col gap-y-4">
      <AgentIdViewHeader
        agentId={agentId}
        agentName={data.name}
        onEdit={() => {}}
        onRemove={() => {}}
      />
      <div className="bg-white rounded-lg border">
        <div className="px-4 py-5 gap-y-5 flex flex-col col-span-5">
          <div className="flex items-center gap-x-3">
            <GeneratedAvatar
              variant="botttsNeutral"
              seed={data.name}
              className="size-10"
            />
            <h2 className="font-semibold text-2xl capitalize">{data.name}</h2>
          </div>
          <Badge
            variant="outline"
            className="flex items-center gap-x-2 [&>svg]:size-4"
          >
            <VideoIcon />
            {data.meetingCount}
            {data.meetingCount === 1 ? " Meeting" : " Meetings"}
          </Badge>
          <div className="flex flex-col gap-y-4 ">
            <p className="text-lg font-medium">INSTRUCTIONS</p>
            <p className="text-nuetral-800">{data.instructions}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export const AgentIdViewLoading = () => {
  return (
    <LoadingState
      title="Loading Agent..."
      description="Fetching agent details."
    />
  );
};
export const AgentIdViewError = () => {
  return (
    <ErrorState
      title="Failed to load agent."
      description="There was an error fetching the agent details. Please try again."
    />
  );
};
