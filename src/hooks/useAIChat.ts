import axios from "axios"
import { useMutationData, useMutationDataState } from "./useMutationData"
import { toast } from "sonner";
import useZodForm from "./useZodForm";
import { createQuestionSchema } from "@/components/forms/aichat-form/schema";

export const useAIChat = (videoId: string) => {

    const { isPending, mutate } = useMutationData(
        ["ai-chat"],
        async (data: { question: string }) => {
           const response = await axios.post(`${process.env.NEXT_PUBLIC_EXPRESS_URL}chat/${videoId}`, {
                question: data.question
            });
            return {question: response.data.question , answer: response.data.answer };
        
        },
        undefined,
        undefined,

        (error) => {
          toast("Error", {
          description: ` ${ error ? (error as any).message : "Something went wrong. Please try again." } `,
      })
        }
    );

    const { latestVariable , allMutations: allChats } = useMutationDataState(["ai-chat"]);

    const { register, onFormSubmit, errors, reset } = useZodForm(
     createQuestionSchema,
     mutate
    );

    return { register, errors, onFormSubmit, isPending, reset, latestVariable, allChats };
}