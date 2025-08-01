"use client";
import CommentForm from "@/components/forms/comment-form";
import { TabsContent } from "@/components/ui/tabs";
import React from "react";
import CommentCard from "../comment-card";
import { useQuerydata } from "@/hooks/useQueryData";
import { getVideoComments } from "@/app/actions/user";
import { VideoCommentProps } from "@/types/index.type";

type Props = {
  author: string;
  videoId: string;
};

const Activities = ({ author, videoId }: Props) => {
  //WIP: add comment optimistically using tanstack query
  const { data } = useQuerydata(["video-comments"], () =>
    getVideoComments(videoId)
  );

  const { data: comments } = data as VideoCommentProps;

  return (
    <TabsContent
      value="Activity"
      className="p-5  rounded-xl flex flex-col gap-y-5"
    >
      <CommentForm author={author} videoId={videoId} />
      {comments.map((comment) => (
        <CommentCard
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
      ))}
    </TabsContent>
  );
};

export default Activities;
