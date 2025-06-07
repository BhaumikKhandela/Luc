"use client";
import { Button } from "@/components/ui/button";
import { useCreateFolders } from "@/hooks/useCreateFolders";
import React from "react";
import { FaFolderPlus } from "react-icons/fa6";

type Props = {
  workspaceId: string;
};

const CreateFolders = (props: Props) => {
  const { onCreateNewFolder } = useCreateFolders(props.workspaceId);

  return (
    <Button
      onClick={onCreateNewFolder}
      className="bg-[#1D1D1D] text-[#707070] flex items-center gap-2 py-6 px-4 rounded-2xl"
    >
      <FaFolderPlus color="#707070" size={20} />
      Create Folder
    </Button>
  );
};

export default CreateFolders;
