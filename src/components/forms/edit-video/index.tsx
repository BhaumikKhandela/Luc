import FormGenerator from "@/components/global/form-generator";
import { Button } from "@/components/ui/button";
import { useEditVideo } from "@/hooks/useEditVideo";

type Props = { title: string, description: string , videoId: string }

const EditVideoForm = ({title, description, videoId }: Props) => {

    const { errors,isPending, onFormSubmit, register} = useEditVideo(videoId, title, description);

    return (
        <form onSubmit={onFormSubmit} className="flex flex-col gap-y-5">
          <FormGenerator
          register={register}
          errors={errors}
          name="title"
          inputType='input'
          type="text"
          placeholder={'Video Title ...'}
          label="Title"/>

         <FormGenerator
            register={register}
            errors={errors}
            name="description"
            inputType='textarea'
            type="text"
            placeholder={'Video Description ...'}
            label="Description"
            lines={5}/>

            <Button type='submit' disabled={isPending}>
                {isPending ? 'Updating...' : 'Update Video'}
            </Button>
        </form>
    )
}

export default EditVideoForm;