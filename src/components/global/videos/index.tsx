"use client";
import { getAllUserVideos } from "@/app/actions/workspace";
import { useQuerydata } from "@/hooks/useQueryData";
import { cn } from "@/lib/utils";
import { VideosProps } from "@/types/index.type";
import { IoIosVideocam } from "react-icons/io";
import VideoCard from "./video-card";
import { title } from "process";

type Props = {
  folderId: string;
  videosKey: string;
  workspaceId: string;
};

const Videos = ({ folderId, videosKey, workspaceId }: Props) => {
  //WIP: Add videos logic

  const { data: videoData } = useQuerydata([videosKey], () =>
    getAllUserVideos(folderId)
  );

  const { status: videoStatus, data: videos } = videoData as VideosProps;
  console.log(videoStatus);
  return (
    <div className="flex flex-col gap-4 mt-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 ">
          <IoIosVideocam className="text-[#BdBdBd]" />
          <h2 className="text-[#BdBdBd] text-xl">Videos</h2>
        </div>
      </div>
      <section
        className={cn(
          videoStatus !== 200
            ? "p-5"
            : "grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
        )}
      >
        {videoStatus === 200 ? (
          videos.map((video) => (
            <VideoCard key={video.id} workspaceId={workspaceId} {...video} />
          ))
        ) : (
          <p className="text=[#BDBDBD]">No Videos in Workspace</p>
        )}
      </section>
    </div>
  );
};

export default Videos;
