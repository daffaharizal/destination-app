import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type ArticleCardDialogProps = {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  article: {
    title: string;
    description: string;
    cover_image_url: string;
  };
};

export default function ArticleDetail({
  open,
  onOpenChange,
  article,
}: ArticleCardDialogProps) {
  if (!article) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{article.title}</DialogTitle>
        </DialogHeader>
        {article.cover_image_url && (
          <img
            src={article.cover_image_url}
            alt={article.title}
            className="rounded-md w-full object-cover mb-4"
          />
        )}
        <p className="text-sm text-gray-600">{article.description}</p>
        <Button className="mt-4 w-full" onClick={() => onOpenChange(false)}>
          Close
        </Button>
      </DialogContent>
    </Dialog>
  );
}
