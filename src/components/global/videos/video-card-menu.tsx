import { Move } from "lucide-react";
import Modal from "../modal";
import ChangeVideoLocation from "@/components/forms/change-video-location";

type Props = {
  videoId: string;
  currentWorkspace?: string;
  currentFolder?: string;
  currentFolderName?: string;
};

const CardMenu = ({
  videoId,
  currentWorkspace,
  currentFolder,
  currentFolderName,
}: Props) => {
  return (
    <Modal
      className="flex items-center cursor-pointer gap-x-2"
      title="Move to the new Workspace/Folder"
      description="This action cannot be undone"
      trigger={<Move size={20} fill="#4f4f4f" className="text-[#4f4f4f]" />}
    >
      <ChangeVideoLocation
        videoId={videoId}
        currentWorkspace={currentWorkspace}
        currentFolder={currentFolder}
        currentFolderName={currentFolderName}
      />
    </Modal>
  );
};

export default CardMenu;
