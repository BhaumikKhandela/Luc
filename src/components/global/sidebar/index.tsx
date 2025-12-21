"use client";
import { getWorkSpaces } from "@/app/actions/workspace";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuerydata } from "@/hooks/useQueryData";
import { NotificationProps, WorkspaceProps } from "@/types/index.type";
import { Separator } from "@radix-ui/react-dropdown-menu";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

import React from "react";
import Modal from "../modal";
import { Menu, PlusCircle } from "lucide-react";
import Search from "../search";
import { MENU_ITEMS } from "@/constants";
import SidebarItems from "./sidebar-items";
import { getNotifications } from "@/app/actions/user";
import WorkspacePlaceHolder from "./workspace-placeholder";
import GlobalCard from "../global-card";
import { Button } from "@/components/ui/button";
import { Loader } from "../loader";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import InfoBar from "../info-bar";
import { useDispatch } from "react-redux";
import { WORKSPACES } from "@/redux/slices/workspaces";
import PaymentButton from "../payment-button";

type Props = {
  activeWorkSpaceId: string;
};

const Sidebar = ({ activeWorkSpaceId }: Props) => {
  
  const router = useRouter();
  const pathName = usePathname();
  const dispatch = useDispatch();

  const { data: workspaceData, isFetched: workspaceFetched } = useQuerydata(
    ["user-workspaces"],
    getWorkSpaces
  );

  const menuItems = MENU_ITEMS(activeWorkSpaceId);

  const {
    data: notifications,
    error,
    isFetched: notificationFetched,
  } = useQuerydata(["user-notifications"], getNotifications);

  

  // Safely access workspace data only after it's fetched
  const workspace =
    workspaceFetched && workspaceData
      ? (workspaceData as WorkspaceProps).data
      : { workspace: [], members: [], subscription: null };

  // Safely access notification count
  const notificationCount =
    notificationFetched &&
    (
      notifications as {
        status: number;
        data?: { _count?: { notification?: number } };
      }
    )?.status === 200
      ? (notifications as any).data?._count?.notification || 0
      : 0;

  const onChangeActiveWorkspace = (value: string) => {
    router.push(`/dashboard/${value}`);
  };

  // Find current workspace only if workspace data exists
  const currentWorkspace = workspace.workspace?.find(
    (s) => s.id === activeWorkSpaceId
  );

  // Optional: Show loading state while data is being fetched
  if (!workspaceFetched) {
    return (
      <div className="bg-[#111111] flex-none relative p-4 h-full w-[250px] flex flex-col gap-4 items-center justify-center">
        <p className="text-neutral-400">Loading workspaces...</p>
      </div>
    );
  }

  if (workspaceFetched && workspace) {
    dispatch(WORKSPACES({ workspaces: workspace.workspace }));
  }

  const SidebarSection = (
    <div className="bg-[#111111] flex-none relative p-4 h-full w-[250px] flex flex-col gap-4 items-center overflow-y-auto">
      <div className="bg-[#111111] p-4 gap-2 flex justify-center items-center mb-4 absolute top-0 left-0 right-0 ">
        <Image src="/opal-logo.svg" height={40} width={40} alt="logo" />
        <p className="text-2xl">Opal</p>
      </div>
      <Select
        defaultValue={activeWorkSpaceId}
        onValueChange={onChangeActiveWorkspace}
      >
        <SelectTrigger className="mt-16 text-neutral-400 bg-transparent">
          <SelectValue placeholder="Select a workspace"></SelectValue>
        </SelectTrigger>
        <SelectContent className="bg-[#111111] backdrop-blur-xl">
          <SelectGroup>
            <SelectLabel>Workspaces</SelectLabel>
            <Separator />

            {workspace.workspace?.map((ws) => (
              <SelectItem key={ws.id} value={ws.id}>
                {ws.name}
              </SelectItem>
            ))}
            {workspace.members &&
              workspace.members.length > 0 &&
              workspace.members.map((member) => {
                return (
                  member.WorkSpace && (
                    <SelectItem
                      value={member.WorkSpace.id}
                      key={member.WorkSpace.id}
                    >
                      {member.WorkSpace.name || "Unnamed Workspace"}
                    </SelectItem>
                  )
                );
              })}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Modal
        trigger={
          currentWorkspace?.type === "PUBLIC" &&
          workspace.subscription?.plan === "PRO" ? (
            <Button
              variant="ghost"
              className="text-sm cursor-pointer flex items-center justify-center bg-neutral-800/90 hover:bg-neutral-800/60 w-full rounded-sm p-[5px] gap-2"
            >
              <PlusCircle
                size={15}
                className="text-neutral-800/90 fill-neutral-500"
              />
              <span className="text-neutral-400 font-semibold text-xs">
                Invite to Workspace
              </span>
            </Button>
          ) : null
        }
        title="Invite to Workspace"
        description="Invite other users to Workspace"
      >
        <Search workspaceId={activeWorkSpaceId} />
      </Modal>
      <p className="w-full text-[#9D9D9D] font-bold mt-4">Menu</p>
      <nav className="w-full">
        <ul>
          {menuItems.map((item) => (
            <SidebarItems
              href={item.href}
              icon={item.icon}
              selected={pathName === item.href}
              title={item.title}
              key={item.title}
              notifications={
                item.title === "Notifications" ? notificationCount : 0
              }
            />
          ))}
        </ul>
      </nav>
      <Separator className="w-4/5" />
      <p className="w-full text-[#9D9D9D] font-bold mt">Workspaces</p>
      {workspace.workspace.length === 1 && workspace.members.length === 0 && (
        <div className="w-full mt-[-10px]">
          <p className="text-[#3c3c3c] font-medium text-sm">
            {workspace.subscription?.plan === "FREE"
              ? "Upgrade to create free workspaces"
              : "No Workspaces"}
          </p>
        </div>
      )}
      <nav className="w-full">
        <ul className="h-[150px] overflow-auto overflow-x-hidden fade-layer">
          {workspace.workspace.length > 0 &&
            workspace.workspace.map(
              (item) =>
                item.type !== "PERSONAL" && (
                  <SidebarItems
                    href={`/dashboard/${item.id}`}
                    selected={pathName === `/dashboard/${item.id}`}
                    title={item.name}
                    notifications={0}
                    key={item.name}
                    icon={
                      <WorkspacePlaceHolder>
                        {item.name.charAt(0)}
                      </WorkspacePlaceHolder>
                    }
                  />
                )
            )}
          {workspace.members.length > 0 &&
            workspace.members.map((item) => (
              <SidebarItems
                href={`/dashboard/${item.WorkSpace.id}`}
                selected={pathName === `/dashboard/${item.WorkSpace.id}`}
                title={item.WorkSpace.name}
                notifications={0}
                key={item.WorkSpace.name}
                icon={
                  <WorkspacePlaceHolder>
                    {item.WorkSpace.name.charAt(0)}
                  </WorkspacePlaceHolder>
                }
              />
            ))}
        </ul>
      </nav>
      <Separator className="w-4/5" />
      {workspace.subscription?.plan === "FREE" && (
        <GlobalCard
          title="Upgrade to Pro"
          description="Unlock AI features like transcription , AI summary, and more"
          footer={<PaymentButton buttonName="Upgrade"/>}
        />
      )}
    </div>
  );

  return (
    <div className="h-full">
      <InfoBar workspaceId={activeWorkSpaceId}/>
      <div className="md:hidden fixed my-4">
        <Sheet>
          <SheetTrigger asChild className="ml-2 ">
            <Button variant={"ghost"} className="mt-[2px]">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side={"left"} className="p-0 w-fit h-full">
            {SidebarSection}
          </SheetContent>
        </Sheet>
      </div>
      <div className="md:block hidden h-full">{SidebarSection}</div>
    </div>
  );
};

export default Sidebar;
