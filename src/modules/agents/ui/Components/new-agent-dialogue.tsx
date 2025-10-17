import { ResponsiveDialog } from "@/components/responsive-dialog";
import { AgentsForms } from "./agents-forms";
interface NewAgentDialogueProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
export const NewAgentDialogue = ({
  open,
  onOpenChange,
}: NewAgentDialogueProps) => {
  return (
    <ResponsiveDialog
      title="Create New Agent"
      description="Configure your new agent"
      open={open}
      onOpenChange={onOpenChange}
    >
      <AgentsForms
        onSuccess={() => onOpenChange(false)}
        onCancel={() => onOpenChange(false)}
      />
    </ResponsiveDialog>
  );
};
