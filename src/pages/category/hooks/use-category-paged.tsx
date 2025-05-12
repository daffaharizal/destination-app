import { api } from "@/hooks/axios";
import type { HttpResponse } from "@/lib/http-reponse";
import { useQuery } from "@tanstack/react-query";
import type { Option } from "@/components/molecules/multiple-selector";
import type { CategoryResponse } from "../lib/model";

export default function useCategoryPaged(page = 1, pageSize = 10, filter: Option[]) {
  const { data, isLoading, isError, isSuccess, refetch } = useQuery({
    queryKey: ["/categories"],
    queryFn: ({ queryKey }) => {
      const [__url] = queryKey;

      const filterParams = (filter as { label: string; value: string }[]).reduce(
        (acc, item) => {
          acc[item.value] = "*";
          return acc;
        },
        {} as Record<string, string>
      );

      return api.get<HttpResponse<CategoryResponse[]>>(__url.toString(), {
        params: {
          "pagination[page]": page,
          "pagination[pageSize]": pageSize,
          ...filterParams,
        },
      });
    },
  });

  return {
    dataCategory: data?.data.data ?? [],
    totalCategory: data?.data.meta?.pagination.pageCount,
    pageCategory: data?.data.meta?.pagination.page,
    pageSizeCategory: data?.data.meta?.pagination.pageSize,
    isLoading,
    isError,
    isSuccess,
    refetchCategory: refetch,
  };
}
