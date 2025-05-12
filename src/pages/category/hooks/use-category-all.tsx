import { api } from "@/hooks/axios";
import type { HttpResponse } from "@/lib/http-reponse";
import { useQuery } from "@tanstack/react-query";
import type { CategoryResponse } from "../lib/model";

export default function useCategoryAll() {
  const { data, isLoading, isError, isSuccess, refetch } = useQuery({
    queryKey: ["/categories"],
    queryFn: ({ queryKey }) => {
      return api.get<HttpResponse<CategoryResponse[]>>(queryKey[0]);
    },
  });

  return {
    dataCategory: data?.data.data ?? [],
    isLoading,
    isError,
    isSuccess,
    refetchCategory: refetch,
  };
}
