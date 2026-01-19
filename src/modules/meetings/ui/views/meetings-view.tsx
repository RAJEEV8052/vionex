"use client";

import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { ErrorState } from "@/components/error-state";
import { useSuspenseQuery } from "@tanstack/react-query";
import { DataTable } from "@/components/data-table";
import { columns } from "../components/columns";
import { EmptyState } from "@/components/ui/empty-state";
import { useRouter } from "next/navigation";
import { useMeetingsFilters } from "../../hooks/use-meetings-filters";
import { DataPagination } from "@/components/data-pagination";
import page from "@/app/(dashboard)/meetings/[meetingsId]/page";

export const MeetingsView = () => {
  const trpc = useTRPC();
  const router = useRouter();
  const [filters, setFilters] = useMeetingsFilters();
  const { data } = useSuspenseQuery(
    trpc.meetings.getMany.queryOptions({ ...filters }),
  );
  return (
    <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
      <DataTable
        data={data.items}
        columns={columns}
        onRowClick={(row) => router.push(`/meetings/${row.id}`)}
      />
      <DataPagination
        page={filters.page}
        totalPages={data.totalPages}
        onPageChange={(page) => setFilters({ page })}
      />
      {data.items.length === 0 && (
        <EmptyState
          title="Create your first meeting"
          description="Create a meeting to start collaborating with your agents. Each meeting allows your agents to interact with participants and follow your instructions."
        />
      )}
    </div>
  );
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
