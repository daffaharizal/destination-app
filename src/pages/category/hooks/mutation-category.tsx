import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/hooks/axios";
import type { PayloadCategory, PayloadUpdateCategory } from "../lib/model";
import type { ErrorTanstackQuery } from "@/lib/http-reponse";

export default function useMutationCategory() {
  const { toast } = useToast();

  const { mutateAsync: addCategory, isPending: isPendingAdd } = useMutation({
    mutationKey: ["/categories"],
    mutationFn: (payload: PayloadCategory) => {
      return api.post("/categories", payload);
    },
    onSuccess: () => {
      toast({
        title: "Category Added",
        description: "The article category has been successfully created.",
        variant: "success",
      });
    },
    onError: (error: ErrorTanstackQuery) => {
      const { message, name } = error?.response.data.error;
      toast({
        title: name,
        description: message,
      });
    },
  });

  const { mutateAsync: updateCategory, isPending: isPendingUpdate } =
    useMutation({
      mutationKey: ["/categories"],
      mutationFn: (payload: PayloadUpdateCategory) => {
        return api.put(`/categories/${payload.documentId}`, payload);
      },
      onSuccess: () => {
        toast({
          title: "Category Updated",
          description: "The changes to the article category have been saved.",
          variant: "success",
        });
      },
      onError: (error: ErrorTanstackQuery) => {
        const { message, name } = error?.response.data.error;
        toast({
          title: name,
          description: message,
        });
      },
    });

  const { mutateAsync: deleteCategory, isPending: isPendingDelete } =
    useMutation({
      mutationKey: ["/categories"],
      mutationFn: ({ documentId }: { documentId: string }) => {
        return api.delete(`/categories/${documentId}`);
      },
      onSuccess: () => {
        toast({
          title: "Category Deleted",
          description: "The article category has been successfully removed.",
          variant: "danger",
        });
      },
      onError: (error: ErrorTanstackQuery) => {
        const { message, name } = error?.response.data.error;
        toast({
          title: name,
          description: message,
        });
      },
    });

  return {
    addCategory,
    updateCategory,
    deleteCategory,
    isPending: isPendingAdd || isPendingUpdate || isPendingDelete,
  };
}
