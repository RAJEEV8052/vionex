import {
  CommandResponsiveDialog,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { Dispatch } from "react";
import { SetStateAction } from "react";
import { CommandList } from "@/components/ui/command";

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}
export const DashboardCommand = ({ open, setOpen }: Props) => {
  return (
    <CommandResponsiveDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Find a meeting or agent" />
      <CommandItem>Type a command or search...</CommandItem>
      <CommandList />
    </CommandResponsiveDialog>
  );
};
