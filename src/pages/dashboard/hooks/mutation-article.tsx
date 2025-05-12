import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import type { PayloadArticle, PayloadUpdateArticle } from "../lib/model";
import { api } from "@/hooks/axios";

export default function useMutationArticle() {
  const { toast } = useToast();

  const { mutateAsync: addArticle, isPending: isPendingAdd } = useMutation({
    mutationKey: ["/articles"],
    mutationFn: (payload: PayloadArticle) => {
      return api.post("/articles", payload);
    },
  });

  const { mutateAsync: updateArticle, isPending: isPendingUpdate } =
    useMutation({
      mutationKey: ["/articles"],
      mutationFn: (payload: PayloadUpdateArticle) => {
        return api.put(`/articles/${payload.documentId}`, payload);
      },
    });

  const { mutateAsync: deleteArticle, isPending: isPendingDelete } =
    useMutation({
      mutationKey: ["/categories"],
      mutationFn: (documentId) => {
        return api.delete(`/categories/${documentId}`);
      },
    });

  return {
    addArticle,
    updateArticle,
    deleteArticle,
    isPending: isPendingAdd || isPendingUpdate || isPendingDelete,
  };
}
