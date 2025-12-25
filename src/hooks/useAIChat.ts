import axios from "axios"
import { useMutationData, useMutationDataState } from "./useMutationData"
import { toast } from "sonner";
import useZodForm from "./useZodForm";
import { createQuestionSchema } from "@/components/forms/aichat-form/schema";

export const useAIChat = (videoId: string) => {

    const { isPending, mutate } = useMutationData(
        ["ai-chat"],
        async (data: { question: string }) => {
            console.log("Tried to hit endpoint")
           const response = await axios.post(`${process.env.NEXT_PUBLIC_EXPRESS_URL}chat/${videoId}`, {
                question: data.question
            });
            console.log("This is chat response ", response.data)
            return {question: response.data.data.question , answer: response.data.data.answer };
        
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