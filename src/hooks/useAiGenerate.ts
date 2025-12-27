import axios from "axios";
import { useMutationData } from "./useMutationData";

export const useAiGenerate = (
  source: string,
  summary: string
) => {
  const { mutate, isPending, data } = useMutationData(
    ["generate-title-description"],
    async (data: { videoId: string }) => {
      return await axios.post(
        `${process.env.NEXT_PUBLIC_EXPRESS_URL}generate/${data.videoId}`,
        {
          transcription: summary,
          source: source,
        }
      );
    }
  );

  return { mutate, isPending, data };
};
