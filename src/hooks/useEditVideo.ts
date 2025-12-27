import { editVideoInfoSchema } from "@/components/forms/edit-video/schema"
import useZodForm from "./useZodForm"
import { useMutationData } from "./useMutationData"
import { editVideoInfo } from "@/app/actions/workspace"

export const useEditVideo = ( videoId: string , title: string , description: string ) => {

    const { mutate, isPending } = useMutationData(['edit-video'], 
    (data: { title: string, description: string})=> editVideoInfo(videoId, data.title, data.description), "preview-video")
    
    const { errors, onFormSubmit, register, reset } = useZodForm(
        editVideoInfoSchema,
        mutate,
        {
            title,
            description
        }

    );

    return { errors, onFormSubmit, register, isPending, reset };
}