import FormGenerator from "@/components/global/form-generator";
import { Button } from "@/components/ui/button";
import { useAiGenerate } from "@/hooks/useAiGenerate";
import { useEditVideo } from "@/hooks/useEditVideo";
import { StarsIcon } from "lucide-react";
import { useEffect } from "react";

type Props = {
  title: string;
  description: string;
  videoId: string;
  source: string;
  summary: string;
};

const EditVideoForm = ({
  title,
  description,
  videoId,
  source,
  summary,
}: Props) => {
  const { errors, isPending, onFormSubmit, register, reset } = useEditVideo(
    videoId,
    title,
    description
  );

  const {
    mutate,
    isPending: generateIsPending,
    data,
  } = useAiGenerate(source, summary);

  useEffect(() => {
    if (!data?.data) {
      return;
    }

    const { title, description } = data.data;

    reset({
      title,
      description,
    });
  }, [data, reset]);
  return (
    <div>
      <form onSubmit={onFormSubmit} className="flex flex-col gap-y-5">
        <FormGenerator
          register={register}
          errors={errors}
          name="title"
          inputType="input"
          type="text"
          placeholder={"Video Title ..."}
          label="Title"
        />

        <FormGenerator
          register={register}
          errors={errors}
          name="description"
          inputType="textarea"
          type="text"
          placeholder={"Video Description ..."}
          label="Description"
          lines={5}
        />

        <Button type="submit" disabled={isPending}>
          {isPending ? "Updating..." : "Update Video"}
        </Button>
      </form>
      <div className="flex flex-col w-full py-2">
        <Button
          disabled={generateIsPending}
          type="button"
          onClick={() => mutate({ videoId })}
        >
          <StarsIcon />
        </Button>
        <span className="text-center pt-1">
          Generate Title and Description using AI
        </span>
      </div>
    </div>
  );
};

export default EditVideoForm;
