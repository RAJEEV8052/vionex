import { EmptyState } from "@/components/empty-state";

export const CompletedState = () => {
  return (
    <div className="bg-white rounded-lg px-4 py-5 flex flex-col gap-y-8 items-center justify-center">
      <EmptyState
        title="Meeting is Completed"
        description="This meeting has been completed."
        image="/processing.svg"
      />
    </div>
  );
};
