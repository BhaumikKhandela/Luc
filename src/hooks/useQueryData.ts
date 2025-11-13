import {
  Enabled,
  QueryFunction,
  QueryKey,
  useQuery,
} from "@tanstack/react-query";

export const useQuerydata = (
  queryKey: QueryKey,
  queryFn: QueryFunction,
  enabled?: Enabled
) => {
  const { data, isPending, isFetched, refetch, isFetching,isLoading, error } = useQuery({
    queryKey,
    queryFn,
    enabled,
  });

  return { data, isPending, isFetched, refetch, isFetching, isLoading, error };
};
