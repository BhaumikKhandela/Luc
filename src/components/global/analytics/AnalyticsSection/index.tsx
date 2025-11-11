"use client";
import React, { useState } from "react";
import { SelectPeriod } from "./date-select";
import EngagementHistory from "../engagement-history";
import RecentVideoCardSection from "../../videos/recent-video";
import { Period, VideoAnalytics } from "@/types/index.type";
import { useQuerydata } from "@/hooks/useQueryData";
import { getTotalViewsAndComments } from "@/app/actions/workspace";

type Props = {
    workspaceId: string
};

const AnalyticsSection = ({workspaceId}: Props) => {

    const [period, setPeriod] = useState<Period>(Period.LAST_7_DAYS);

    const { data, isFetched } = useQuerydata(["video-analytics", workspaceId, period], () => getTotalViewsAndComments(workspaceId, period));

    const videoAnalyticsData = data as VideoAnalytics;

    return (
       <div>
        <div className="flex justify-between">
             <h3 className="text-[#BDBDBD] my-4 text-2xl">Analytics</h3>
                    <SelectPeriod period={period} setPeriod={setPeriod}/>
        </div>
        <div className="flex gap-5">
            <div className="w-2/3 p-5">
            <div className="flex gap-5 my-2 border-b-2 border-b-[#BDBDBD] pt-5 pb-5 pr-5">
                <div>
                    <p className="text-lg">Views</p>
                    {isFetched ? <span className="w-full flex justify-center items-center">{videoAnalyticsData.data.totalViews}</span> : (<div className="h-8 w-16 bg-gray-500 rounded-lg animate-pulse mt-2"></div>)}
                   
                </div>
                <div>
                    <p className="text-lg">Comments</p>
                   { isFetched ? <span className="w-full flex justify-center items-center">{videoAnalyticsData.data.totalComments}</span> : (<div className="h-8 w-16 bg-gray-500 rounded-lg animate-pulse mt-2"></div>)}
                </div>
            </div>
            <EngagementHistory period={period} />
            
            </div>
            <div className="w-1/3 p-5">
                
                    <RecentVideoCardSection workspaceId={workspaceId} />
            </div>
             
        </div>
        </div>
    )
}

export default AnalyticsSection;