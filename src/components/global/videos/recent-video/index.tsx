'use client';
import { getRecentVideos } from "@/app/actions/workspace";
import { useQuerydata } from "@/hooks/useQueryData";
import { RecentVideoTypes } from "@/types/index.type";
import React, { useState } from "react";
import RecentVideoCard from "./card";

type Props = {
    workspaceId: string
};

const RecentVideoCardSection = ({workspaceId}: Props) => {
    const { data, isFetched } = useQuerydata(['recent-videos'], () => getRecentVideos(workspaceId));

  
    const { data: videoData, status: videoStatus } = data as RecentVideoTypes;
    return (
        <div>
            <h4 className="text-[#BDBDBD] text-lg">Recent activity</h4>
           { (videoStatus !== 200) ? <p className="text-neutral-300"> No recent videos available</p> :
            (videoData && videoData.length > 0) ? (videoData.map((video, index) => {
                return (
                    <RecentVideoCard key={index + 1} title={video.title} description={video.description} views={video.views} comments={video.comments} workspaceId={workspaceId} createdAt={video.createdAt} source={video.source} id={video.id}/>
                )
            })) : (<div></div>)}
        </div>
    )
}

export default RecentVideoCardSection;