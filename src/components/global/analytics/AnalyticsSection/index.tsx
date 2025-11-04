"use client";
import React, { useState } from "react";
import { SelectPeriod } from "./date-select";

type Props = {};

export enum Period{
    LAST_7_DAYS = 'Last 7 days',
    LAST_24_HOURS = 'Last 24 hours',
    LAST_30_DAYS = 'Last 30 days',
    LAST_6_MONTHS = 'Last 6 months',
    LAST_1_YEAR = 'Last 1 year',
    LIFETIME = 'Lifetime'
}

const AnalyticsSection = (props: Props) => {

    const [ period, setPeriod] = useState<Period>(Period.LAST_7_DAYS);
    return (
       <div>
        <div className="flex justify-between">
             <h3 className="text-[#BDBDBD] text-xl">Analytics</h3>
                    <SelectPeriod period={period} setPeriod={setPeriod}/>
        </div>
        <div className="my-10">
            <h4 className="text-[#BDBDBD] text-lg">Engagement History</h4>
            <div className="flex gap-5 my-10 border-b-2 border-b-[#BDBDBD] p-5">
                <div>
                    <p>Views</p>
                    <span className="w-full flex justify-center items-center">64</span>
                </div>
                <div>
                    <p>Comments</p>
                   <span className="w-full flex justify-center items-center">12</span>
                </div>
            </div>
            <EngagementHistory />
             
        </div>
        </div>
    )
}

export default AnalyticsSection;