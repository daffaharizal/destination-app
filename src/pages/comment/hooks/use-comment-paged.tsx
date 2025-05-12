import { api } from "@/hooks/axios";
import type { HttpResponse } from "@/lib/http-reponse";
import { useQuery } from "@tanstack/react-query";
import type { Option } from "@/components/molecules/multiple-selector";
import type { CommentResponse } from "../lib/model";

export default function useCommentPaged(page = 1, pageSize = 10, filter: Option[]) {
  const { data, isLoading, isError, isSuccess, refetch } = useQuery({
    queryKey: ["/comments"],
    queryFn: ({ queryKey }) => {
      const [__url] = queryKey;

      const filterParams = (filter as { label: string; value: string }[]).reduce(
        (acc, item) => {
          acc[item.value] = "*";
          return acc;
        },
        {} as Record<string, string>
      );

      return api.get<HttpResponse<CommentResponse[]>>(__url.toString(), {
        params: {
          "pagination[page]": page,
          "pagination[pageSize]": pageSize,
          ...filterParams,
        },
      });
    },
  });

  return {
    dataComment: data?.data.data ?? [],
    totalComment: data?.data.meta?.pagination.pageCount,
    pageComment: data?.data.meta?.pagination.page,
    pageSizeComment: data?.data.meta?.pagination.pageSize,
    isLoading,
    isError,
    isSuccess,
    refetchComment: refetch,
  };
}
