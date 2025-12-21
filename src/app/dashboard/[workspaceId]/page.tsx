import CreateFolders from "@/components/global/create-folders";
import CreateWorkspace from "@/components/global/create-workspace";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import Folders from "../../../components/global/folders";
import VideosWithoutFolder from "@/components/global/videos/without-folder";

type Props = {
  params: Promise<{ workspaceId: string }>;
};

const Page = async ({ params }: Props) => {
  // Await the params before using them
  const { workspaceId } = await params;

  return (
    <div>
      <Tabs defaultValue="videos" className="mt-6">
        <div className="flex w-full justify-between items-center mb-4">
          <TabsList className="bg-transparent gap-2 pl-0">
            <TabsTrigger
              className="p-[13px] px-6 rounded-full data-[state=active]: bg-[#252525]"
              value="videos"
            >
              Videos
            </TabsTrigger>
            <TabsTrigger
              className="p-[13px] px-6 rounded-full data-[state=active]: bg-[#252525]"
              value="archive"
            >
              Archive
            </TabsTrigger>
          </TabsList>
          <div className="flex gap-x-3">
            <CreateWorkspace />
            <CreateFolders workspaceId={workspaceId} />
          </div>
        </div>
        <TabsContent value="videos" className="mt-0">
          <div className="flex flex-col gap-8">
            <Folders workspaceId={workspaceId} />
            <VideosWithoutFolder workspaceId={workspaceId} />
          </div>
        </TabsContent>
        <TabsContent value="archive" className="mt-0">
          <div>Archive content goes here</div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Page; // Export the component
