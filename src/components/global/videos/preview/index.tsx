"use client";
import { getPreviewVideo } from "@/app/actions/workspace";
import { useQuerydata } from "@/hooks/useQueryData";
import { VideoProps } from "@/types/index.type";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {
  videoId: string;
};

const VideoPreview = ({ videoId }: Props) => {
  //WIP: Setup notify first view
  const router = useRouter();

  const { data } = useQuerydata(["preview-video"], () =>
    getPreviewVideo(videoId)
  );

  const { data: video, status, author } = data as VideoProps;

  if (status !== 200) router.push("/");

  const daysAgo = Math.floor(
    (new Date().getTime() - video.createdAt.getTime()) / (24 * 60 * 60 * 1000)
  );

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 p-10 lg:px-20 lg:py-10 overflow-y-auto gap-5">
      <div className="flex flex-col lg:col-span-2 gap-y-10">
        <div>
          <div className="flex gap-x-5 items-start justify-between">
            <h2 className="text-white text-4xl font-bold">{video.title}</h2>
            {/* {author ? (
                        <EditVideo
                        videoId = {videoId}
                        title={video.title as string}
                        description={video.description as string}
                        />
                    ): (
                        <></>
                    )} */}
          </div>

          <span className="flex gap-x-3 mt-2">
            <p className="text-[#9D9D9D] capitalize">
              {video.User?.firstname} {video.User?.lastname}
            </p>
            <p className="text-[#707070]">
              {daysAgo === 0 ? "Today" : `${daysAgo}d ago`}
            </p>
          </span>
        </div>
        <video
          preload="metadata"
          className="w-full aspect-video opacity-50 rounded-xl"
          controls
        >
          <source
            src={`${process.env.NEXT_PUBLIC_CLOUD_FRONT_STREAM_URL}/${video.source}#1`}
          />
        </video>
      </div>
    </div>
  );
};

export default VideoPreview;
