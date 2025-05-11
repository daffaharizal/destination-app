import { api } from "@/hooks/axios";
import type { HttpResponse } from "@/lib/http-reponse";
import { useQuery } from "@tanstack/react-query";
import type { ArticleResponse } from "../lib/model";

export default function useArticlePaged(page = 1, pageSize = 10) {
  const { data, isLoading, isError, isSuccess, refetch } = useQuery({
    queryKey: ["/articles"],
    queryFn: ({ queryKey }) => {
      return api.get<HttpResponse<ArticleResponse[]>>(queryKey[0], {
        params: {
          "pagination[page]": page,
          "pagination[pageSize]": pageSize,
        },
      });
    },
  });

  return {
    dataArticle: data?.data.data ?? [],
    totalArticle: data?.data.meta?.pagination.total,
    pageArticle: data?.data.meta?.pagination.page,
    pageSizeArticle: data?.data.meta?.pagination.pageSize,
    isLoading,
    isError,
    isSuccess,
    refetchArticle: refetch,
  };
}
