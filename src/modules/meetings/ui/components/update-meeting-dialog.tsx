import { ResponsiveDialog } from "@/components/responsive-dialog";
import { MeetingForms } from "./meeting-form";

import { MeetingGetOne } from "../../types";
interface UpdateMeetingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialValues: MeetingGetOne;
}
export const UpdateMeetingDialog = ({
  open,
  onOpenChange,
  initialValues,
}: UpdateMeetingDialogProps) => {
  return (
    <ResponsiveDialog
      title="Update Meeting"
      description="Update your meeting details"
      open={open}
      onOpenChange={onOpenChange}
    >
      <MeetingForms
        onSuccess={(id) => {
          onOpenChange(false);
        }}
        onCancel={() => onOpenChange(false)}
        initialValues={initialValues}
      />
    </ResponsiveDialog>
  );
};
