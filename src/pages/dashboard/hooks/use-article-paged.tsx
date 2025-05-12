import { api } from "@/hooks/axios";
import type { HttpResponse } from "@/lib/http-reponse";
import { useQuery } from "@tanstack/react-query";
import type { ArticleResponse } from "../lib/model";
import type { Option } from "@/components/molecules/multiple-selector";

export default function useArticlePaged(
  page = 1,
  pageSize = 10,
  filter: Option[]
) {
  const { data, isLoading, isError, isSuccess, refetch } = useQuery({
    queryKey: ["/articles"],
    queryFn: ({ queryKey }) => {
      const [__url] = queryKey;

      const filterParams = (
        filter as { label: string; value: string }[]
      ).reduce((acc, item) => {
        acc[item.value] = "*";
        return acc;
      }, {} as Record<string, string>);

      return api.get<HttpResponse<ArticleResponse[]>>(__url.toString(), {
        params: {
          "pagination[page]": page,
          "pagination[pageSize]": pageSize,
          ...filterParams,
        },
      });
    },
  });

  return {
    dataArticle: data?.data.data ?? [],
    totalArticle: data?.data.meta?.pagination.pageCount,
    pageArticle: data?.data.meta?.pagination.page,
    pageSizeArticle: data?.data.meta?.pagination.pageSize,
    isLoading,
    isError,
    isSuccess,
    refetchArticle: refetch,
  };
}
