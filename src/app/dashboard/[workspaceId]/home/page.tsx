import { getRecentVideos } from "@/app/actions/workspace";
import AnalyticsSection from "@/components/global/analytics/AnalyticsSection";
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