import { useEffect, useState } from "react";
import { useQuerydata } from "./useQueryData";
import { searchUsers } from "@/app/actions/user";
import { searchContentsOfWorkspace } from "@/app/actions/workspace";

export const useSearch = (
  key: string,
  type: "USERS" | "SEARCHINSIDEWORKSPACE",
  workspaceId?: string
) => {
  const [query, setQuery] = useState("");
  const [debounce, setDebounce] = useState("");
  const [onUsers, setOnUsers] = useState<
    | {
        id: string;
        subscription: {
          plan: "PRO" | "FREE";
        } | null;
        firstname: string | null;
        lastname: string | null;
        image: string | null;
        email: string | null;
      }[]
    | null
  >(null);
  const [workspaceResult, setWorkspaceResult] = useState<{
   members: {
        id: string | undefined;
        firstname: string | null | undefined;
        lastname: string | null | undefined;
    }[];
    folders: {
        id: string;
        name: string;
    }[];
    videos: {
        id: string;
        title: string | null;
    }[];
  } | null>(null);

  const onSearchQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    const delayInputTimeoutId = setTimeout(() => {
      setDebounce(query);
    }, 1000);
    return () => clearTimeout(delayInputTimeoutId);
  }, [query]);

  const { refetch, isFetching } = useQuerydata(
    type === "USERS" ? [key, debounce] : [key, debounce, workspaceId],
    async ({ queryKey }) => {
      if (type === "USERS") {
        const users = await searchUsers(queryKey[1] as string);

        if (users.status === 200) {
          setOnUsers(users.data ?? null);
          return users.data;
        }
        return null;
      } else if (type === "SEARCHINSIDEWORKSPACE" && workspaceId) {
        const workspaceSearchResult = await searchContentsOfWorkspace(
          queryKey[1] as string,
          workspaceId
        );
        if (workspaceSearchResult.status === 200) {
          setWorkspaceResult(workspaceSearchResult.data ?? null);
          return workspaceSearchResult.data;
        }
      }
    },
    false
  );

  useEffect(() => {
    if (debounce) refetch();
    if (!debounce) setOnUsers(null);

    return () => {
      debounce;
    };
  }, [debounce]);

  return { onSearchQuery, query, isFetching, onUsers, workspaceResult };
};
