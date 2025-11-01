import { Button } from "@/components/ui/button"
import Modal from "../modal"
import { Edit } from "lucide-react"
import EditVideoForm from "@/components/forms/edit-video"

type Props = { title: string, description: string , videoId: string }
const EditVideo = ({title, description, videoId }: Props) => {

    return (
        <Modal
        title="Edit video details"
        description="You can update your video details here!"
        trigger={
            <Button variant={'ghost'}>
                <Edit className="text-[#6c6c6c]" />
            </Button>
        }>
            <EditVideoForm videoId={videoId} title={title} description={description} />
        </Modal>
    )

}

export default EditVideo;