"use client";
import { getNotifications } from "@/app/actions/user";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useQuerydata } from "@/hooks/useQueryData";
import { User } from "lucide-react";
import React from "react";

type Props = {};

type NotificationResponse = {
  status: number;
  data: {
    notifications: {
      id: string;
      userId: string;
      content: string;
    }[];
  };
};

const Notifications = (props: Props) => {
  const { data: notifications } = useQuerydata(
    ["user-notifications"],
    getNotifications
  );

  const status = (notifications as NotificationResponse | undefined)?.status;
  const notificationList =
    (notifications as NotificationResponse | undefined)?.data?.notifications ??
    [];

  if (!notifications || status !== 200 || notificationList.length === 0) {
    return (
      <div className="flex justify-center items-center h-full w-full">
        <p>No Notification</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {notificationList.map((n) => (
        <div
          key={n.id}
          className="border-2 flex gap-x-3 items-center rounded-lg p-3"
        >
          <Avatar>
            <AvatarFallback>
              <User />
            </AvatarFallback>
          </Avatar>
          {n.content}
        </div>
      ))}
    </div>
  );
};

export default Notifications;