// comment-form-modal.tsx
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { MessageCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useArticleAll from "@/pages/dashboard/hooks/use-article-all";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  content: z.string().min(1, "Comment must fill"),
  article: z.number().optional(),
});

type CommentFormValues = z.infer<typeof formSchema>;

type Props = {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  initialData?: Partial<CommentFormValues> | null;
  onSubmit: (values: CommentFormValues) => void;
  isEdit?: boolean;
};

export default function CommentFormModal({
  open,
  onOpenChange,
  initialData,
  onSubmit,
  isEdit = false,
}: Props) {
  const { dataArticle } = useArticleAll();

  const form = useForm<CommentFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
      article: undefined,
    },
  });

  useEffect(() => {
    if (initialData) {
      form.reset(initialData);
    }
  }, [initialData, form]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Update Comment" : "Add Comment"}
          </DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Update Comment for Article"
              : "Enter the Comment"}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-gray-700 mb-1 block">
                    Comment
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <MessageCircle className="absolute left-4 top-3 w-4 h-4 text-gray-500" />
                      <Input
                        {...field}
                        placeholder="Enter you comment in here"
                        className="pl-11 py-5"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {!isEdit && (
              <FormField
                control={form.control}
                name="article"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm text-gray-700 mb-1 block">
                      Article
                    </FormLabel>
                    <FormControl>
                      <Select
                        value={field.value?.toString()}
                        onValueChange={(value) => field.onChange(Number(value))}
                      >
                        <SelectTrigger className="w-full text-sm">
                          <SelectValue placeholder="Select Article" />
                        </SelectTrigger>
                        <SelectContent>
                          {dataArticle?.map((item) => (
                            <SelectItem
                              key={item.id}
                              value={item.id.toString()}
                            >
                              {item.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <DialogFooter className="mt-4">
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Batal
                </Button>
              </DialogClose>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {isEdit ? "Update Comment" : "Add Comment"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
