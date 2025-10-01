import { LoadingState } from "@/components/loading-state";
import { AgentsView } from "@/modules/agents/ui/views/agents-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { get } from "http";
import { Suspense } from "react";

const Page = async () => {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.agents.getMany.queryOptions());
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense
        fallback={
          <LoadingState title="Loading Agents" description="Please wait..." />
        }
      >
        <AgentsView />
      </Suspense>
    </HydrationBoundary>
  );
};
export default Page;
