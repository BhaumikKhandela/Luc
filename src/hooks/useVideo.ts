import { useMutationData } from "./useMutationData";
import { useQuerydata } from "./useQueryData";
import { createCommentSchema } from "@/components/forms/comment-form/schema";
import useZodForm from "./useZodForm";
import { createCommentAndReply, getUserProfile } from "@/app/actions/user";

export const useVideoComment = (videoId: string, commentId?: string) => {
  const { data } = useQuerydata(["user-profile"], getUserProfile);

  const { status, data: user } = data as {
    status: number;
    data: { id: string; image: string; firstname: string; lastname:string };
  };

  const { isPending, mutate } = useMutationData(
    ["new-content"],
    (data: { comment: string }) =>
      createCommentAndReply(user.id, data.comment, videoId, commentId),
    "video-comments",
  );

  const { register, onFormSubmit, errors, reset } = useZodForm(
    createCommentSchema,
    mutate
  );

  return { register, errors, onFormSubmit, isPending, reset };
};
