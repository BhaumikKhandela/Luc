"use client";
import { cn } from "@/lib/utils";
import { ArrowRight, Folder as FolderIcon } from "lucide-react";
import React from "react";
import Folder from "./folder";
import { FaFolder } from "react-icons/fa6";
import { useQuerydata } from "@/hooks/useQueryData";
import { getWorkspaceFolders } from "@/app/actions/workspace";
import { useMutationDataState } from "@/hooks/useMutationData";
import { useDispatch } from "react-redux";
import { FOLDERS } from "@/redux/slices/folders";

type Props = {
  workspaceId: string;
};

export type FolderProps = {
  status: number;
  data: ({
    _count: {
      videos: number;
    };
  } & {
    id: string;
    name: string;
    createdAt: Date;
    workspaceId: string | null;
  })[];
};

const Folders = (props: Props) => {
  const dispatch = useDispatch();
  const { data, isFetched } = useQuerydata(["workspace-folders"], () =>
    getWorkspaceFolders(props.workspaceId)
  );

  const { latestVariable } = useMutationDataState(["create-folder"]);

  const { status, data: folders } = data as FolderProps;

  if (isFetched && folders) {
    console.log("Statement is true");
    console.log(folders);
    dispatch(FOLDERS({ folders: folders }));
  }
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <FaFolder color="#707070" size={20} />
          <h2 className="text-[#BDBDBD] text-xl">Folders</h2>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-[#BDBDBD]">See all</p>
          <ArrowRight color="#707070" />
        </div>
      </div>
      <section
        className={cn(
          status !== 200 && "justify-center",
          "flex items-center gap-4 overflow-x-auto w-full"
        )}
      >
        {status !== 200 ? (
          <p className="text-neutral-300">No Folders in Workspace</p>
        ) : (
          <>
            {latestVariable && latestVariable.status === "pending" && (
              <Folder
                name={latestVariable.variables.name}
                id={latestVariable.variables.id}
                optimistic={true}
              />
            )}
          </>
        )}
        {folders.map((folder) => (
          <Folder
            name={folder.name}
            count={folder._count.videos}
            id={folder.id}
            key={folder.id}
          />
        ))}
      </section>
    </div>
  );
};

export default Folders;
