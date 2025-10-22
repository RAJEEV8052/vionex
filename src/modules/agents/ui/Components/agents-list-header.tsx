"use client";
import { Button } from "@/components/ui/button";
import { PlaneIcon, PlusIcon, XCircleIcon } from "lucide-react";
import { NewAgentDialogue } from "./new-agent-dialogue";
import { useState } from "react";
import { useAgentsFilters } from "../../hooks/use-agents-filters";
import { AgentSearchFilters } from "./agents-search-filters";
import { DEFAULT_PAGE } from "@/constant";

export const AgentsListHeader = () => {
  const [filters, setfilters] = useAgentsFilters();
  const [isDialogueOpen, setIsDialogueOpen] = useState(false);
  const isAnyFilterModified = !!filters.search;
  const onClearFilters = () => {
    setfilters({
      search: "",
      page: DEFAULT_PAGE,
    });
  };
  return (
    <>
      <NewAgentDialogue
        open={isDialogueOpen}
        onOpenChange={setIsDialogueOpen}
      />
      <div className="py-4 px-4 md:px-8 flex flex-col gap-y-4">
        <div className="flex items-center justify-between">
          <h5 className="font-medium text-xl">My Agents</h5>
          <Button onClick={() => setIsDialogueOpen(true)}>
            <PlusIcon />
            New Agent
          </Button>
        </div>
        <div className="flex items-center gap-x-2 p-1">
          <AgentSearchFilters />
          {isAnyFilterModified && (
            <Button variant="outline" size="sm" onClick={onClearFilters}>
              <XCircleIcon />
              Clear
            </Button>
          )}
        </div>
      </div>
    </>
  );
};
