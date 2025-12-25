import { turnOnTrial } from "@/app/actions/user";
import { useMutationData } from "./useMutationData";
import { toast } from "sonner";

export const useTrial = () => {
  const { isPending, mutate } = useMutationData(
    ["active-trial"],
    (videoId: string) => turnOnTrial(videoId),
    "preview-video",
    () => {},
    () => {
      toast.error("Something went wrong. Please try again later.");
    }
  );
  return { isPending, mutate };
};
