import { MutationFunction, MutationKey } from "@tanstack/react-query";
import { useMutationData } from "./useMutationData";
import { createFolder } from "@/app/actions/workspace";

export const useCreateFolders = (workspaceId: string) => {
  const { mutate } = useMutationData(
    ["create-folder"],
    () => createFolder(workspaceId),
    "workspace-folders"
  );

  const onCreateNewFolder = () =>
    mutate({ name: "Untitled", id: "optimistic--id" });

  return { onCreateNewFolder };
};
