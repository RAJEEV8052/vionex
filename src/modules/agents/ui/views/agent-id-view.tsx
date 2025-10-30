"use client";

import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";

import { ErrorState } from "@/components/error-state";
import { AgentIdViewHeader } from "../Components/agent-id-view-header";
import { UpdateAgentDialogue } from "../Components/update-agent-dialog";
import { GeneratedAvatar } from "@/components/generated-avatar";
import { Badge } from "@/components/ui/badge";
import { VideoIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useConfirm } from "@/hooks/use-confirm";
import { useState } from "react";

interface Props {
  agentId: string;
}
export const AgentIdView = ({ agentId }: Props) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const trpc = useTRPC();
  const [updateAgentDialogOpen, setUpdateAgentDialogOpen] = useState(false);
  const { data } = useSuspenseQuery(
    trpc.agents.getOne.queryOptions({ id: agentId })
  );
  const removeAgent = useMutation(
    trpc.agents.remove.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          trpc.agents.getMany.queryOptions({})
        );
        router.push("/agents");
      },
      onError: (error) => {
        toast.error(`Failed to remove agent: ${error.message}`);
      },
    })
  );
  const [RemoveConfirmation, confirmRemove] = useConfirm(
    "Are you sure you want to remove this agent?",
    `The following action will remove "${data.meetingCount}" associated meetings. This action cannot be undone.`
  );
  const handleRemoveAgent = async () => {
    const ok = await confirmRemove();
    if (!ok) return;
    await removeAgent.mutateAsync({ id: agentId });
  };

  return (
    <>
      <RemoveConfirmation />
      <UpdateAgentDialogue
        open={updateAgentDialogOpen}
        onOpenChange={setUpdateAgentDialogOpen}
        initialValues={data}
      />
      <div className=" flex-1 py-4 px-4 md:px-8 flex flex-col gap-y-4">
        <AgentIdViewHeader
          agentId={agentId}
          agentName={data.name}
          onEdit={() => setUpdateAgentDialogOpen(true)}
          onRemove={handleRemoveAgent}
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
    </>
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
