"use client";

import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { ErrorState } from "@/components/error-state";
import { useSuspenseQuery } from "@tanstack/react-query";

export const MeetingsView = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.meetings.getMany.queryOptions({}));
  return <div>{JSON.stringify(data)}</div>;
};
export const MeetingsViewLoading = () => {
  return (
    <LoadingState
      title="Loading meetings"
      description="Fetching your meetings, please wait a moment."
    />
  );
};
export const MeetingsViewError = () => {
  return (
    <ErrorState
      title="Failed to load meetings"
      description="There was an error while fetching your meetings. Please try again."
    />
  );
};
