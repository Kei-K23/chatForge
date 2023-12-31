import {
  Channel,
  ChannelType,
  Member,
  MemberType,
  Profile,
} from "@prisma/client";
import {
  Hash,
  Headphones,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Video,
} from "lucide-react";
import MobileToggle from "../mobile-toggle";
import UserAvatar from "../user-avatar";
import SocketIndicator from "../socket-indicator";
import { checkFullName } from "@/lib/helper";
import ChatVideoAndAudioButton from "./chat-video-and-audio-button";
import FriendMobileToggle from "../friend/friend-mobile-toggle";

interface ChatHeaderProps {
  serverId: string;
  type: "channel" | "member";
  channel?: Channel;
  member?: Member & { profile: Profile };
  profile?: Profile;
  directId?: string;
}

const channelIcons = {
  [ChannelType.TEXT]: (
    <Hash className="font-semibold text-zinc-700 dark:text-zinc-300  w-6  h-6 mr-2" />
  ),
  [ChannelType.AUDIO]: (
    <Headphones className="font-semibold text-zinc-700 dark:text-zinc-300  w-6  h-6 mr-2" />
  ),
  [ChannelType.VIDEO]: (
    <Video className="font-semibold text-zinc-700 dark:text-zinc-300  w-6  h-6 mr-2" />
  ),
};

const memberIcons = {
  [MemberType.ADMIN]: <ShieldAlert className="w-4 h-4 ml-1 text-red-500" />,
  [MemberType.MODERATOR]: <ShieldCheck className="w-4 h-4 ml-1 text-sky-500" />,
  [MemberType.GUEST]: <Shield className="w-4 h-4 ml-1 " />,
};

const ChatHeader = ({
  channel,
  serverId,
  type,
  member,
  profile,
  directId,
}: ChatHeaderProps) => {
  return (
    <div className="px-3 flex items-center gap-x-3 h-12 w-full font-semibold border-b dark:border-b-neutral-700 border-b-neutral-400">
      {directId ? (
        <FriendMobileToggle directId={directId} serverId={serverId} />
      ) : (
        <MobileToggle serverId={serverId} />
      )}

      <p className="text-[19px] font-semibold flex items-center">
        {type === "channel" && channel && channelIcons[channel?.type]}
        {type === "member" && member ? (
          <UserAvatar
            imageUrl={member.profile.imageUrl}
            name={member.profile.name}
            className="w-10 h-10 rounded-full"
          />
        ) : (
          profile && (
            <UserAvatar
              imageUrl={profile.imageUrl}
              name={profile.name}
              className="w-10 h-10 rounded-full"
            />
          )
        )}
        {channel && channel?.name}

        {member ? (
          <p className="ml-2 flex items-center">
            {member && member.profile && checkFullName(member.profile.name)}
            {!directId && member && memberIcons[member.role]}
          </p>
        ) : (
          profile && (
            <p className="ml-2 flex items-center">
              {checkFullName(profile.name)}
            </p>
          )
        )}
      </p>

      <div className="ml-auto flex items-center gap-x-2">
        {/* {type === "member" && <ChatVideoAndAudioButton />} */}
        <SocketIndicator />
      </div>
    </div>
  );
};

export default ChatHeader;
