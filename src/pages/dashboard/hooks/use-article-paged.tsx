import { api } from "@/hooks/axios";
import type { HttpResponse } from "@/lib/http-reponse";
import { useQuery } from "@tanstack/react-query";
import type { ArticleResponse } from "../lib/model";

export default function useArticlePaged() {
  const { data, isLoading, isError, isSuccess, refetch } = useQuery({
    queryKey: ["/articles"],
    queryFn: ({ queryKey }) => {
      return api.get<HttpResponse<ArticleResponse[]>>(queryKey[0]);
    },
  });

  return {
    dataArticle: data?.data.data ?? [],
    isLoading,
    isError,
    isSuccess,
    refetchArticle: refetch,
  };
}
