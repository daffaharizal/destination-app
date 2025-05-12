import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/hooks/axios";
import type { PayloadCategory, PayloadUpdateCategory } from "../lib/model";

export default function useMutationCategory() {
  const { toast } = useToast();

  const { mutateAsync: addCategory, isPending: isPendingAdd } = useMutation({
    mutationKey: ["/categories"],
    mutationFn: (payload: PayloadCategory) => {
      return api.post("/categories", payload);
    },
  });

  const { mutateAsync: updateCategory, isPending: isPendingUpdate } =
    useMutation({
      mutationKey: ["/categories"],
      mutationFn: (payload: PayloadUpdateCategory) => {
        return api.put(`/categories/${payload.documentId}`, payload);
      },
    });

  const { mutateAsync: deleteCategory, isPending: isPendingDelete } =
    useMutation({
      mutationKey: ["/categories"],
      mutationFn: ({ documentId }: { documentId: string }) => {
        return api.delete(`/categories/${documentId}`);
      },
    });

  return {
    addCategory,
    updateCategory,
    deleteCategory,
    isPending: isPendingAdd || isPendingUpdate || isPendingDelete,
  };
}
