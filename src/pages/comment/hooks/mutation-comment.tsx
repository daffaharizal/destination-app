import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/hooks/axios";
import type { PayloadComment, PayloadUpdateComment } from "../lib/model";
import type { ErrorTanstackQuery } from "@/lib/http-reponse";

export default function useMutationComment() {
  const { toast } = useToast();

  const { mutateAsync: addComment, isPending: isPendingAdd } = useMutation({
    mutationKey: ["/comments"],
    mutationFn: (payload: PayloadComment) => {
      return api.post("/comments", payload);
    },
    onSuccess: () => {
      toast({
        title: "Comment Added",
        description: "Your comment has been successfully posted.",
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

  const { mutateAsync: updateComment, isPending: isPendingUpdate } =
    useMutation({
      mutationKey: ["/comments"],
      mutationFn: (payload: PayloadUpdateComment) => {
        return api.put(`/comments/${payload.documentId}`, payload);
      },
      onSuccess(data) {
        toast({
          title: "Comment Updated",
          description: "The comment has been successfully updated.",
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

  const { mutateAsync: deleteComment, isPending: isPendingDelete } =
    useMutation({
      mutationKey: ["/comments"],
      mutationFn: ({ documentId }: { documentId: string }) => {
        return api.delete(`/comments/${documentId}`);
      },
      onSuccess: () => {
        toast({
          title: "Comment Deleted",
          description: "The comment has been successfully removed.",
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
    addComment,
    updateComment,
    deleteComment,
    isPending: isPendingAdd || isPendingUpdate || isPendingDelete,
  };
}
