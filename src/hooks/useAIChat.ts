import axios from "axios"
import { useMutationData } from "./useMutationData"
import { toast } from "sonner";
import useZodForm from "./useZodForm";
import { z } from "zod";

export const useAIChat = (videoId: string) => {

    const questionSchema = z.string();

    const { isPending, mutate } = useMutationData(
        ["ai-chat"],
        async (data: { question: string }) => {
           const response = await axios.post(`${process.env.NEXT_PUBLIC_EXPRESS_URL}chat/${videoId}`, {
                question: data.question
            });

            if (response.status === 400) {
                throw new Error(`${response.data.message}`);
            }

            if( response.status === 500 ) {
                throw new Error("Internal Server Error. Please try again later.");
            }

            if (response.status === 200) {
                return {question: response.data.question , answer: response.data.answer };
            }

            return { question: "", answer: "" };
        },
        undefined,
        undefined,

        (error) => {
          toast("Error", {
          description: ` ${ error ? (error as any).message : "Something went wrong. Please try again." } `,
      })
        }
    );

    const { register, onFormSubmit, errors, reset } = useZodForm(
     questionSchema,
     mutate
    );

    return { register, errors, onFormSubmit, isPending, reset };
}