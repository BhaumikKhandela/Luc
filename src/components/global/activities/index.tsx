"use client";
import CommentForm from "@/components/forms/comment-form";
import { TabsContent } from "@/components/ui/tabs";
import React from "react";
import CommentCard from "../comment-card";
import { useQuerydata } from "@/hooks/useQueryData";
import { getUserProfile, getVideoComments } from "@/app/actions/user";
import { VideoCommentProps } from "@/types/index.type";
import { useMutationDataState } from "@/hooks/useMutationData";

type Props = {
  author: string;
  videoId: string;
};

const Activities = ({ author, videoId }: Props) => {
  
  const { data } = useQuerydata(["video-comments"], () =>
    getVideoComments(videoId)
  );
  const { data: profile } = useQuerydata(["user-profile"], getUserProfile);

  const { status, data: profileData } = profile as {
    status: number;
    data: { id: string; image: string; firstname: string; lastname: string };
  }
 
  const { latestVariable } = useMutationDataState(['new-content']);

  const { data: comments } = data as VideoCommentProps;

  return (
    <TabsContent
      value="Activity"
      className=""
    >

      <div className="rounded-xl p-5 flex flex-col gap-y-5 h-screen overflow-y-auto pb-5 border-2 border-l-neutral-600 border-r-neutral-600 border-b-neutral-600">
       <CommentForm author={author} videoId={videoId} />
      { latestVariable && latestVariable.variables && latestVariable.status === 'pending' ? <CommentCard
          comment = {latestVariable.variables.comment}
          author={{
            image: profileData.image,
            firstname: profileData.firstname,
            lastname: profileData.lastname,
          }}
          videoId={videoId}
          reply={[]}
        /> : null
           }
      {comments.map((comment) => 
        {
          if(comment.User && comment.User.id === profileData.id){
            return <CommentCard
          comment={comment.comment}
          key={comment.id}
          author={{
            image: comment.User?.image,
            firstname: comment.User?.firstname,
            lastname: comment.User?.lastname,
          }}
          videoId={videoId}
          reply={comment.reply}
          commentId={comment.id}
        />
          }
        }
      )}
      {comments.map((comment) => 
        {
          if(comment.User && comment.User.id !== profileData.id){
            return <CommentCard
          comment={comment.comment}
          key={comment.id}
          author={{
            image: comment.User?.image,
            firstname: comment.User?.firstname,
            lastname: comment.User?.lastname,
          }}
          videoId={videoId}
          reply={comment.reply}
          commentId={comment.id}
        />
          }
        }
      )}
      </div>
      
    </TabsContent>
  );
};

export default Activities;
