import { ResponsiveDialog } from "@/components/responsive-dialog";
import { AgentsForms } from "./agents-forms";
import { AgentGetOne } from "../../types";
interface UpdateAgentDialogueProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialValues: AgentGetOne;
}
export const UpdateAgentDialogue = ({
  open,
  onOpenChange,
  initialValues,
}: UpdateAgentDialogueProps) => {
  return (
    <ResponsiveDialog
      title="Edit Agent"
      description="Update the details of your agent."
      open={open}
      onOpenChange={onOpenChange}
    >
      <AgentsForms
        onSuccess={() => onOpenChange(false)}
        onCancel={() => onOpenChange(false)}
        initialValues={initialValues}
      />
    </ResponsiveDialog>
  );
};
