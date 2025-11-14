import { getRecentVideos, getVideoAnalyticsData } from "@/app/actions/workspace";
import AnalyticsSection from "@/components/global/analytics/AnalyticsSection";
import { Period } from "@/types/index.type";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

type Props = {
    params: Promise<{
        workspaceId: string
    }>
};

const Home = async (props: Props) => {

   const { workspaceId } = await props.params;

   const query = new QueryClient();
   await query.prefetchQuery({
    queryKey: ["recent-videos"],
    queryFn: () => getRecentVideos(workspaceId)
   });

   await query.prefetchQuery({
    queryKey: ["video-analytics"],
    queryFn: () => getVideoAnalyticsData(workspaceId, Period.LAST_7_DAYS),
  });


    return (
        <HydrationBoundary state={dehydrate(query)}>
        <div>
            <h2 className="text-[#BDBDBD] text-4xl">Welcome To Opal</h2>
            <div>
                <div className="mt-5">
                <AnalyticsSection workspaceId={workspaceId}/>
                </div>
            </div>
        </div>
        </HydrationBoundary>
    )
}

export default Home;