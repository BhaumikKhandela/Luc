"use client";
import CommentForm from "@/components/forms/comment-form";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CommentRepliesProps } from "@/types/index.type";

import React, { useState } from "react";

type Props = {
  comment: string;
  author: {
    image: string | undefined | null;
    firstname: string | undefined | null;
    lastname: string | undefined | null;
  };
  videoId: string;
  commentId?: string;
  reply: CommentRepliesProps[];
  isReply?: boolean;
};

const CommentCard = ({
  comment,
  author,
  videoId,
  commentId,
  reply,
  isReply,
}: Props) => {
  const [onReply, setOnReply] = useState<boolean>(false);

  return (
    <Card
      className={cn(
        isReply
          ? "bg-[#1D1D1D] pl-10 border-none "
          : "border-[1px] bg-[#1D1D1D] p-5"
      )}
    >
      <div className="flex gap-x-2 items-center">
        <Avatar className="w-6 h-6">
          <AvatarImage
            src={
              author.image ??
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdk8vatWHMW6NfHW1L85ZGAMKnCT9s-sIXZQ&s"
            }
            alt="author"
          />
        </Avatar>

        <p className="capitalize text-sm text-[#BDBDBD]">
          {author.firstname && author.lastname
            ? `${author.firstname} ${author.lastname}`
            : "Anonymous"}
        </p>
      </div>
      <div>
        <p className="text-[#BDBDBD]">{comment}</p>
      </div>
      {!onReply && (
        <div className="flex justify-end mt-3">
          {!onReply ? (
            <Button
              onClick={() => setOnReply(true)}
              className="text-sm rounded-full bg-[#252525] text-white hover:text-black"
            >
              Reply
            </Button>
          ) : (
            <CommentForm
              close={() => setOnReply(false)}
              videoId={videoId}
              commentId={commentId}
              author={author.firstname + " " + author.lastname}
            />
          )}
        </div>
      )}
      {reply.length > 0 && (
        <div className="flex flex-col gap-y-10 mt-5">
          {reply.map((r) => (
            <CommentCard
              isReply
              reply={[]}
              comment={r.comment}
              commentId={r.commentId!}
              videoId={videoId}
              key={r.id}
              author={{
                image: r.User?.image!,
                firstname: r.User?.firstname!,
                lastname: r.User?.lastname!,
              }}
            />
          ))}
        </div>
      )}
    </Card>
  );
};

export default CommentCard;
