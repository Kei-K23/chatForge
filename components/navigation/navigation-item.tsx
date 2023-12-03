"use client";
import { cn } from "@/lib/utils";
import ActionTooltip from "../action-tooltip";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";

interface NavigationItemProps {
  id: string;
  name: string;
  imageUrl: string;
}

const NavigationItem = ({ id, imageUrl, name }: NavigationItemProps) => {
  const router = useRouter();
  const params = useParams();
  return (
    <ActionTooltip description={name} align="center" side="right">
      <button
        onClick={() => {
          router.push(`/servers/${id}`);
        }}
        className="group relative flex items-center mb-4"
      >
        <div
          className={cn(
            "absolute w-[4px] bg-zinc-300 left-0 rounded-r-full transition-all",
            params.serverId !== id && "group-hover:h-[20px]",
            params.serverId === id ? "h-[36px]" : "h-[10px]"
          )}
        ></div>
        <div
          className={cn(
            "relative group mx-2 overflow-hidden flex w-[55px] h-[55px] rounded-[25px]  transition-all group-hover:rounded-[19px] border-2 border-zinc-500/50",
            params.serverId === id &&
              "bg-primary/10 rounded-[19px] border-indigo-500"
          )}
        >
          <Image fill src={imageUrl} alt={name} />
        </div>
      </button>
    </ActionTooltip>
  );
};

export default NavigationItem;