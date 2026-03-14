import { useState } from "react";
import { SearchIcon } from "lucide-react";
import Highlighter from "react-highlight-words";
import { useQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { generateAvatarUri } from "@/lib/avatar";

interface Props {
  meetingId: string;
}

export const Transcript = ({ meetingId }: Props) => {
  const trpc = useTRPC();
  const { data, isLoading } = useQuery(
    trpc.meetings.getTranscript.queryOptions({ id: meetingId }),
  );
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = (data || []).filter((item) =>
    item.text?.toString().toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const formatTimestamp = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    return [h, m, s]
      .map((v) => (v < 10 ? "0" + v : v))
      .filter((v, i) => v !== "00" || i > 0)
      .join(":");
  };

  if (isLoading) {
    return (
      <div className="p-4 text-sm text-muted-foreground">
        Loading transcript...
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg flex flex-col gap-y-4 w-full h-[70vh]">
      <p className="text-sm font-medium">Transcript</p>
      <div className="relative">
        <Input
          placeholder="Search in transcript..."
          value={searchQuery}
          className="pl-7 h-9 w-[240px]"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <SearchIcon className="size-4 absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground" />
      </div>
      <ScrollArea className="flex-1 pr-4">
        <div className="flex flex-col gap-y-4 pb-4">
          {filteredData.length > 0 ? (
            filteredData.map((item) => (
              <div
                key={item.start_ts}
                className="flex flex-col gap-y-2 hover:bg-muted p-4 rounded-md border"
              >
                <div className="flex gap-x-2 items-center">
                  <Avatar className="size-6">
                    <AvatarImage
                      alt={item.user.name}
                      src={
                        item.user.image ||
                        generateAvatarUri({
                          seed: item.user.name,
                          variant: "initials",
                        })
                      }
                    />
                  </Avatar>
                  <p className="text-sm font-medium">{item.user.name}</p>
                  <p className="text-sm text-blue-500 font-medium ml-auto">
                    {formatTimestamp(item.start_ts)}
                  </p>
                </div>
                <Highlighter
                  className="text-sm text-neutral-700 leading-relaxed"
                  highlightClassName="bg-yellow-200"
                  searchWords={[searchQuery]}
                  autoEscape={true}
                  textToHighlight={item.text || ""}
                />
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground text-center py-10">
              {searchQuery ? "No matches found." : "No transcript available."}
            </p>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};
