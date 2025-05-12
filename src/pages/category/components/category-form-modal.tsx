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
import { Type } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  name: z.string().min(1, "Judul tidak boleh kosong"),
});

type CategoryFormValues = z.infer<typeof formSchema>;

type Props = {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  initialData?: Partial<CategoryFormValues> | null;
  onSubmit: (values: CategoryFormValues) => void;
};

export default function CategoryFormModal({
  open,
  onOpenChange,
  initialData,
  onSubmit,
}: Props) {
  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  useEffect(() => {
    if (initialData) {
      form.reset(initialData);
    }
  }, [initialData, form]);

  const isEdit = !!initialData;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Update Category" : "Add Category"}
          </DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Perbarui data Category berikut."
              : "Masukkan data Category baru."}
          </DialogDescription>
        </DialogHeader>

        {/* Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-gray-700 mb-1 block">
                    Name
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Type className="absolute left-4 top-3 w-4 h-4 text-gray-500" />
                      <Input
                        {...field}
                        placeholder="Masukkan nama Category"
                        className="pl-11 py-5"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Footer */}
            <DialogFooter className="mt-4">
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Batal
                </Button>
              </DialogClose>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {isEdit ? "Update Data" : "Create Data"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
