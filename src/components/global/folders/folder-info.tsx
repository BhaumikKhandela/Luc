"use client";
import { getFolderInfo } from "@/app/actions/workspace";
import { useQuerydata } from "@/hooks/useQueryData";
import { FolderProps } from "@/types/index.type";

type Props = {
  folderId: string;
};

const FolderInfo = ({ folderId }: Props) => {
  const { data } = useQuerydata(["folder-info"], () => getFolderInfo(folderId));

  const { data: folder } = data as FolderProps;
  return (
    <div className="flex items-center ">
      <h2 className="text-[#BdBdBd] text-2xl">{folder.name}</h2>
    </div>
  );
};

export default FolderInfo;
