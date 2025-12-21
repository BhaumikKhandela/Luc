import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, UploadIcon, User } from "lucide-react";
import { PiVideoCameraFill } from "react-icons/pi";
import React from "react";
import { UserButton } from "@clerk/nextjs";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { useSearch } from "@/hooks/useSearch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SearchResultsPortal } from "./search-result-portal";
import { useRouter } from "next/navigation";

type Props = {
  workspaceId: string;
};

const InfoBar = ({ workspaceId }: Props) => {
  const searchRef = React.useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [position, setPosition] = React.useState<{
    top: number;
    left: number;
    width: number;
  }>({ top: 0, left: 0, width: 0 });

  const { onSearchQuery, query, isFetching, workspaceResult } = useSearch(
    "workspace-search",
    "SEARCHINSIDEWORKSPACE",
    workspaceId
  );

  const handleFolderClick = (folderId: string) => {
    router.push(
      `${process.env.NEXT_PUBLIC_HOST_URL}/dashboard/${workspaceId}/folder/${folderId}`
    );
  };
  const handleVideoClick = (videoId: string) => {
    router.push(
      `${process.env.NEXT_PUBLIC_HOST_URL}/dashboard/${workspaceId}/video/${videoId}`
    );
  };

  React.useEffect(() => {
    if (!searchRef.current) return;

    const rect = searchRef.current.getBoundingClientRect();

    setPosition({
      top: rect.bottom + window.scrollY,
      left: rect.left + window.scrollX,
      width: rect.width,
    });
  }, [query]);

  return (
    <header className="pl-20 md:pl-[265px] fixed p-4 w-full flex item-center justify-between gap-4">
      <div className="relative w-full max-w-lg">
        <div
          ref={searchRef}
          className="flex gap-4 justify-center items-center border-2 rounded-full px-4 w-full max-w-lg"
        >
          <Search size={25} className="text-[#707070]" />

          <Input
            className="bg-transparent border-none !placeholder-neutral-500"
            placeholder="Search for people, projects , tags & folders"
            onChange={onSearchQuery}
          />
        </div>
        {workspaceResult && query && (
          <SearchResultsPortal>
            <div
              className="absolute z-[1000]"
              style={{
                top: position.top + 8,
                left: position.left,
                width: position.width,
              }}
            >
              <Command className="rounded-xl border bg-background shadow-2xl">
                <CommandList className="max-h-[60vh] overflow-y-auto">
                  <CommandEmpty>No results found.</CommandEmpty>

                  {/* USERS */}
                  <CommandGroup heading="Users">
                    {workspaceResult.members.map((member) => (
                      <CommandItem
                        key={member.id}
                        value={`user:${member.id}`}
                        className="flex gap-3 my-1 cursor-pointer"
                      >
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={""} />
                          <AvatarFallback>
                            <User className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm capitalize">
                          {member.firstname} {member.lastname}
                        </span>
                      </CommandItem>
                    ))}
                  </CommandGroup>

                  <CommandSeparator />

                  {/* VIDEOS */}
                  <CommandGroup heading="Videos">
                    {workspaceResult.videos.map((video) => (
                      <CommandItem
                        key={video.id}
                        value={`video:${video.id}`}
                        onSelect={() => handleVideoClick(video.id)}
                        className="my-1 cursor-pointer"
                      >
                        <span className="text-sm">{video.title}</span>
                      </CommandItem>
                    ))}
                  </CommandGroup>

                  <CommandSeparator />

                  {/* FOLDERS */}
                  <CommandGroup heading="Folders">
                    {workspaceResult.folders.map((folder) => (
                      <CommandItem
                        key={folder.id}
                        value={`folder:${folder.id}`}
                        onSelect={() => handleFolderClick(folder.id)}
                        className="my-1 cursor-pointer"
                      >
                        <span className="text-sm">{folder.name}</span>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </div>
          </SearchResultsPortal>
        )}
      </div>

      <div className="flex items-center gap-4">
        <Button className="bg-[#9D9D9D] flex items-center gap-2">
          <UploadIcon size={30} />{" "}
          <span className="flex items-center gap-2">Upload</span>
        </Button>
        <Button className="bg-[#9D9D9D] flex items-center gap-2">
          <PiVideoCameraFill size={30} />{" "}
          <span className="flex items-center gap-2">Record</span>
        </Button>
        <UserButton />
      </div>
    </header>
  );
};

export default InfoBar;
