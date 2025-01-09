import { Button } from "../ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "../ui/drawer";

interface IDeleteConfirmationProps {
  open: boolean;
  itemLabel: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeleteConfirmation({
  open,
  itemLabel,
  onCancel,
  onConfirm,
}: IDeleteConfirmationProps) {
  return (
    <Drawer
      defaultOpen={false}
      open={open}
      onOpenChange={(open) => {
        onCancel();
      }}
    >
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm pt-5">
          <DrawerTitle></DrawerTitle>
          Are you sure you want to delete&nbsp;{itemLabel} ?
          <DrawerFooter>
            <Button variant={"destructive"} type="button" onClick={onConfirm}>
              Yes, delete
            </Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
