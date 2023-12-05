"use client";

import { cn } from "@/lib/utils";
import { Channel, MemberType, Server } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import { channelIcons } from "./server-sidebar";
import ActionTooltip from "../action-tooltip";
import { Edit, Lock, Trash } from "lucide-react";
import { ModalType, useModal } from "@/hook/use-modal-store";
import { MouseEvent } from "react";

interface ServerChannelProps {
  channel: Channel;
  server: Server;
  role?: MemberType;
}

const ServerChannel = ({ channel, server, role }: ServerChannelProps) => {
  const params = useParams();
  const router = useRouter();
  const { onOpen } = useModal();

  function onAction(e: MouseEvent, action: ModalType) {
    e.stopPropagation();
    onOpen(action, { channel, server });
  }

  function onClick() {
    return router.push(`/servers/${server.id}/channels/${channel.id}`);
  }
  return (
    <button
      onClick={onClick}
      className={cn(
        " rounded-sm flex items-center group w-full hover:bg-zinc-700/50 p-[3px] px-1 transition-all",
        params.channelId === channel.id && "bg-zinc-700/50"
      )}
    >
      <p
        className={cn(
          " font-semibold line-clamp-1 flex items-center text-zinc-300 group-hover:text-zinc-100",
          params.channelId === channel.id && "text-zinc-100"
        )}
      >
        {channelIcons[channel.type]}
        {channel.name}
      </p>
      {role !== MemberType.GUEST && channel.name !== "general" && (
        <div className="flex items-center gap-x-[2px] ml-auto">
          <ActionTooltip description="Edit" align="center" side="top">
            <Edit
              className="hidden group-hover:block w-4 h-4 transition-all text-zinc-300 hover:text-zinc-100"
              onClick={(e) => onAction(e, "editChannel")}
            />
          </ActionTooltip>
          <ActionTooltip description="Delete" align="center" side="top">
            <Trash
              className="hidden group-hover:block w-4 h-4 transition-all text-red-500/80 hover:text-red-500"
              onClick={(e) => onAction(e, "deleteChannel")}
            />
          </ActionTooltip>
        </div>
      )}
      {channel.name === "general" && (
        <Lock className="ml-auto w-4 h-4 transition-all text-zinc-300 " />
      )}
    </button>
  );
};

export default ServerChannel;