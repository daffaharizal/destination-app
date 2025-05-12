import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useEffect } from "react";
import { ClipboardList, Image, Type } from "lucide-react";
import useCategoryAll from "@/pages/category/hooks/use-category-all";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  title: z.string().min(1, "Title must add"),
  description: z.string().min(1, "Description must add"),
  cover_image_url: z.string().url("Must a URL"),
  category: z.coerce.number().min(1, "Category must fill"),
});

type ArticleFormValues = z.infer<typeof formSchema>;

type Props = {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  initialData?: Partial<ArticleFormValues> | null;
  onSubmit: (values: ArticleFormValues) => void;
};

export default function ArticleFormModal({
  open,
  onOpenChange,
  initialData,
  onSubmit,
}: Props) {
  const { dataCategory, isLoading, isSuccess } = useCategoryAll();

  const form = useForm<ArticleFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      cover_image_url: "",
      category: 0,
    },
  });

  useEffect(() => {
    if (initialData) {
      form.reset({
        ...initialData,
        category: initialData.category ?? 0,
      });
    }
  }, [initialData, form]);

  const isEdit = !!initialData;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEdit ? "Update Article" : "Add Article"}</DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Perbarui data Article berikut."
              : "Masukkan data Article baru."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-gray-700 mb-1 block">
                    Title
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Type className="absolute left-4 top-3 w-4 h-4 text-gray-500" />
                      <Input
                        {...field}
                        placeholder="Enter title"
                        className="pl-11 py-5"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-gray-700 mb-1 block">
                    Description
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Enter description"
                      className="py-3"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Cover Image URL */}
            <FormField
              control={form.control}
              name="cover_image_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-gray-700 mb-1 block">
                    URL Gambar Sampul
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Image className="absolute left-4 top-3 w-4 h-4 text-gray-500" />
                      <Input
                        {...field}
                        placeholder="https://example.com/image.jpg"
                        className="pl-11 py-5"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Category */}
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-gray-700 mb-1 block">
                    Category
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <ClipboardList className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />

                      <Select
                        value={field.value?.toString()}
                        onValueChange={(value) => field.onChange(Number(value))}
                        defaultValue={initialData?.category?.toString()}
                      >
                        <SelectTrigger className="w-full text-sm pl-10">
                          {" "}
                          <SelectValue placeholder="Select Category" />
                        </SelectTrigger>
                        <SelectContent>
                          {dataCategory?.map((item) => (
                            <SelectItem
                              key={item.id}
                              value={item.id.toString()}
                            >
                              {item.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
