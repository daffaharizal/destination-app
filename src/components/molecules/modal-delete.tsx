import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogDelete,
} from "@/components/ui/alert-dialog";

interface ModalDeleteProps {
  title?: string;
  description?: string;
  onConfirm: VoidFunction;
  trigger: React.ReactNode;
}

export default function ModalDelete({
  trigger,
  title = "Apakah kamu yakin ingin menghapus?",
  description = "Tindakan ini tidak dapat dibatalkan.",
  onConfirm,
}: ModalDeleteProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogDelete onClick={onConfirm}>Yes, Delete</AlertDialogDelete>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
