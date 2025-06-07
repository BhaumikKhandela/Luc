import React, { JSX } from "react";
import { MdHomeFilled } from "react-icons/md";
import { IoLibrary } from "react-icons/io5";
import { RiNotificationBadgeLine } from "react-icons/ri";
import { BsCreditCard2Back } from "react-icons/bs";
import { IoIosSettings } from "react-icons/io";

export const MENU_ITEMS = (
  workspaceId: string
): { title: string; href: string; icon: JSX.Element }[] => [
  {
    title: "Home",
    href: `/dashboard/${workspaceId}/home`,
    icon: <MdHomeFilled color="#C0C0C0" />,
  },
  {
    title: "My Library",
    href: `/dashboard/${workspaceId}`,
    icon: <IoLibrary color="#C0C0C0" />,
  },
  {
    title: "Notifications",
    href: `/dashboard/${workspaceId}/notifications`,
    icon: <RiNotificationBadgeLine color="#C0C0C0" />,
  },
  {
    title: "Billing",
    href: `/dashboard/${workspaceId}/billing`,
    icon: <BsCreditCard2Back color="#C0C0C0" />,
  },
  {
    title: "Settings",
    href: `/dashboard/${workspaceId}/settings`,
    icon: <IoIosSettings color="#C0C0C0" />,
  },
];
