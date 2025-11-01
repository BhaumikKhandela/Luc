'use client';
import { getVideosWithNoFolder } from "@/app/actions/workspace";
import { useQuerydata } from "@/hooks/useQueryData";
import { VideosProps } from "@/types/index.type";
import VideoCard from "../video-card";
import { Video } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
    workspaceId: string;
}
const VideosWithoutFolder = (props: Props) => {
    const { data: videoData, isFetched: videoDataFetched } = useQuerydata(
        ["videos-without-folder"],
        () => getVideosWithNoFolder(props.workspaceId)
      );
    
      console.warn("Video Data", videoData);
    
      const { status: videoStatus, data: videosWithoutFolder } = videoData as VideosProps;

      return (
        <div className="flex flex-col gap-4">
             <section
                    className={cn(
                      videoStatus !== 200 && "justify-center",
                      "flex items-center gap-4 overflow-x-auto w-full"
                    )}
                  >
                    {
                        (videoStatus !== 200) ? (
                        <p className="text-neutral-300">Check Folders to see Videos</p>
                        ) : (
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"> 
                             { videoDataFetched && videosWithoutFolder.length > 0 && (
                                videosWithoutFolder.map((video) => (
                                
                                <VideoCard key={video.id} workspaceId={props.workspaceId} {...video} />
                        
                              ))
                              )}
                            </div>
                        )
                    }
               
            </section>
         
        </div>
      )
}

export default VideosWithoutFolder;