"use client";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import { Loader } from "../loader";
import { useMutationData, useMutationDataState } from "@/hooks/useMutationData";
import { renameFolders } from "@/app/actions/workspace";
import { Input } from "@/components/ui/input";
import { FaFolder } from "react-icons/fa6";

type Props = {
  name: string;
  id: string;
  optimistic?: boolean;
  count?: number;
};

const Folder = ({ name, id, optimistic, count }: Props) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const folderCardRef = useRef<HTMLDivElement | null>(null);
  const pathName = usePathname();
  const router = useRouter();
  const [onRename, setOnRename] = useState(false);

  const rename = () => setOnRename(true);
  const renamed = () => setOnRename(false);

  // WIP: Loading state

  const { mutate, isPending } = useMutationData(
    ["rename-folders"],
    (data: { name: string }) => renameFolders(id, data.name),
    "workspace-folders",
    renamed
  );

  const { latestVariable } = useMutationDataState(["rename-folders"]);

  const handleFolderClick = () => {
    router.push(`${pathName}/folder/${id}`);
  };

  const handleNameDoubleClick = (e: React.MouseEvent<HTMLParagraphElement>) => {
    e.stopPropagation();
    rename();
  };

  const updateFolderName = (e: React.FocusEvent<HTMLInputElement>) => {
    console.log("Inside update FolderName");
    if (inputRef.current && folderCardRef.current) {
      console.log("InputRef and folderCardRef exists");

      // Get the related target (where the focus is moving to)
      const relatedTarget = e.relatedTarget as Node | null;
      console.log("Related target:", relatedTarget);

      // Check if the click is outside both the input and folder card
      const isOutside = !folderCardRef.current.contains(relatedTarget);
      console.log("Is click outside:", isOutside);

      if (isOutside) {
        console.log("Click is outside the folder card");
        if (inputRef.current.value) {
          console.log("Mutate called with value:", inputRef.current.value);
          mutate({ name: inputRef.current.value, id });
        } else {
          console.log("No value, calling renamed");
          renamed();
        }
      } else {
        console.log("Click is inside the folder card, ignoring");
      }
    }
  };
  return (
    <div
      onClick={handleFolderClick}
      ref={folderCardRef}
      className={cn(
        optimistic && "opacity-60",
        "flex hover:bg-neutral-800 cursor-pointer transition duration-150 items-center gap-2 justify-between min-w-[250px] py-4 px-4 rounded-lg border-[1px]"
      )}
    >
      <Loader state={isPending}>
        <div className="flex flex-col gap-[1px]">
          {onRename ? (
            <input
              autoFocus
              onBlur={updateFolderName}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  if (inputRef.current?.value) {
                    mutate({ name: inputRef.current.value, id });
                  } else {
                    renamed();
                  }
                }
              }}
              placeholder={name}
              className="border-none text-base w-full outline-none text-neutral-300 bg-transparent p-0"
              ref={inputRef}
            />
          ) : (
            <p
              onClick={(e) => e.stopPropagation()}
              className="text-neutral-300"
              onDoubleClick={handleNameDoubleClick}
            >
              {latestVariable &&
              latestVariable.status === "pending" &&
              latestVariable.variables.id === id
                ? latestVariable.variables.name
                : name}
            </p>
          )}

          <span className={"text-sm text-neutral-500"}>
            {count || 0} videos
          </span>
        </div>
      </Loader>
      <FaFolder color="#707070" size={20} />
    </div>
  );
};

export default Folder;
