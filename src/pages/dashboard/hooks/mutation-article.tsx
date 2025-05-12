import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import type { PayloadArticle, PayloadUpdateArticle } from "../lib/model";
import { api } from "@/hooks/axios";
import type { ErrorTanstackQuery } from "@/lib/http-reponse";

export default function useMutationArticle() {
  const { toast } = useToast();

  const { mutateAsync: addArticle, isPending: isPendingAdd } = useMutation({
    mutationKey: ["/articles"],
    mutationFn: (payload: PayloadArticle) => {
      return api.post("/articles", payload);
    },
    onSuccess: () => {
      toast({
        title: "Category Added",
        description: "The category has been successfully created.",
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

  const { mutateAsync: updateArticle, isPending: isPendingUpdate } =
    useMutation({
      mutationKey: ["/articles"],
      mutationFn: (payload: PayloadUpdateArticle) => {
        return api.put(`/articles/${payload.documentId}`, payload);
      },
      onSuccess: () => {
        toast({
          title: "Category Updated",
          description: "The changes to the category have been saved.",
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

  const { mutateAsync: deleteArticle, isPending: isPendingDelete } =
    useMutation({
      mutationKey: ["/articles"],
      mutationFn: ({ documentId }: { documentId: string }) => {
        return api.delete(`/articles/${documentId}`);
      },
      onSuccess: () => {
        toast({
          title: "Category Deleted",
          description: "The category has been successfully removed.",
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
    addArticle,
    updateArticle,
    deleteArticle,
    isPending: isPendingAdd || isPendingUpdate || isPendingDelete,
  };
}
