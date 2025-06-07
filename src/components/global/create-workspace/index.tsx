"use client";
import { getWorkSpaces } from "@/app/actions/workspace";
import { useQuerydata } from "@/hooks/useQueryData";
import Modal from "../modal";
import { Button } from "@/components/ui/button";
import { PiFolderPlusDuotone } from "react-icons/pi";
import WorkspaceForm from "@/components/forms/workspace-form";

type Props = {};

const CreateWorkspace = (props: Props) => {
  const { data } = useQuerydata(["user-workspaces"], getWorkSpaces);

  const { data: plan } = data as {
    status: number;
    data: {
      subscription: {
        plan: "PRO" | "FREE";
      } | null;
    };
  };

  if (plan.subscription?.plan === "FREE") {
    return <></>;
  }

  if (plan.subscription?.plan === "PRO") {
    return (
      <Modal
        title="Create a Workspace"
        description="Workspaces helps you collaborate with team members. You are assignmend a default personal workspace where you can share video in private with yourself"
        trigger={
          <Button className="bg-[#1D1D1D] text-[#707070] flex items-center gap-2 py-6 px-4 rounded-2xl">
            <PiFolderPlusDuotone />
            Create a workspace
          </Button>
        }
      >
        <WorkspaceForm />
      </Modal>
    );
  }
  return <div>CreateWorkspace</div>;
};

export default CreateWorkspace;
