"use client";

import { format } from "date-fns";
import humanizeDuration from "humanize-duration";
import { ColumnDef } from "@tanstack/react-table";
import { MeetingGetMany } from "../../types";
import { GeneratedAvatar } from "@/components/generated-avatar";
import {
  CornerDownRightIcon,
  CircleCheckIcon,
  CircleXIcon,
  LoaderIcon,
  ClockFadingIcon,
  ClockArrowUpIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

function formatDuration(seconds: number) {
  return humanizeDuration(seconds * 1000, {
    largest: 1,
    round: true,
    units: ["h", "m", "s"],
  });
}

const statusIconMap = {
  completed: CircleCheckIcon,
  cancelled: CircleXIcon,
  upcoming: ClockArrowUpIcon,
  active: LoaderIcon,
  processing: LoaderIcon,
} as const;

const statusColorMap = {
  upcoming: "bg-yellow-500/20 text-yellow-800 border-yellow-800/5",
  active: "bg-blue-500/20 text-blue-800 border-blue-800/5",
  cancelled: "bg-rose-500/20 text-rose-800 border-rose-800/5",
  completed: "bg-emerald-500/20 text-emerald-800 border-emerald-800/5",
  processing: "bg-gray-300/20 text-gray-800 border-gray-800/5",
} as const;

export const columns: ColumnDef<MeetingGetMany[number]>[] = [
  {
    accessorKey: "name",
    header: "Meeting Name",
    cell: ({ row }) => (
      <div className="flex flex-col gap-y-1">
        <span className="font-semibold capitalize">{row.original.name}</span>

        <div className="flex items-center gap-x-2">
          <div className="flex items-center gap-x-1">
            <CornerDownRightIcon className="size-3 text-muted-foreground" />
            <span className="text-sm text-muted-foreground max-w-[200px] truncate capitalize">
              {row.original.agent.name}
            </span>
          </div>

          <GeneratedAvatar
            variant="botttsNeutral"
            seed={row.original.agent.name}
            className="size-4"
          />

          <span className="text-sm text-muted-foreground">
            {row.original.startedAt
              ? format(row.original.startedAt, "MMM d, yyyy h:mm a")
              : "Not started"}
          </span>
        </div>
      </div>
    ),
  },

  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status as keyof typeof statusIconMap;

      const Icon = statusIconMap[status] ?? LoaderIcon;
      const color =
        statusColorMap[status] ??
        "bg-gray-200/20 text-gray-700 border-gray-700/5";

      return (
        <Badge
          variant="outline"
          className={cn(
            "capitalize flex items-center gap-x-1 [&>svg]:size-4",
            statusColorMap[row.original.status as keyof typeof statusColorMap]
          )}
        >
          <Icon className={cn(status === "processing" && "animate-spin")} />
          {status ?? "unknown"}
        </Badge>
      );
    },
  },

  {
    accessorKey: "duration",
    header: "Duration",
    cell: ({ row }) => (
      <Badge
        variant="outline"
        className="capitalize [&>svg]:size-4 flex items-center gap-x-2"
      >
        <ClockFadingIcon className="text-blue-700" />
        {row.original.duration
          ? formatDuration(row.original.duration)
          : "No duration"}
      </Badge>
    ),
  },
];
