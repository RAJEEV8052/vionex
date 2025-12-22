import { ResponsiveDialog } from "@/components/responsive-dialog";
import { MeetingForms } from "./meeting-form";
import { useRouter } from "next/navigation";
interface NewMeetingDialogueProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
export const NewMeetingDialogue = ({
  open,
  onOpenChange,
}: NewMeetingDialogueProps) => {
  const router = useRouter();
  return (
    <ResponsiveDialog
      title="Create New Meeting"
      description="Configure your new meeting"
      open={open}
      onOpenChange={onOpenChange}
    >
      <MeetingForms
        onSuccess={(id) => {
          onOpenChange(false);
          router.push(`/meetings/${id}`);
        }}
        onCancel={() => onOpenChange}
      />
    </ResponsiveDialog>
  );
};
