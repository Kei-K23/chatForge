"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useModal } from "@/hook/use-modal-store";
import FriendCommandBox from "../friend/friend-command-box";

const AddFriendModal = () => {
  const router = useRouter();
  const { isOpen, onClose, type, data } = useModal();
  const { users } = data;
  const isModalOpen = isOpen && type === "addFriend";

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl md:text-2xl flex items-center gap-2 justify-center">
            Friends <User className="w-5 h-5 md:w-9 md:h-9 text-indigo-500" />
          </DialogTitle>
          <DialogDescription className="text-center text-lg">
            Make friend with other people
          </DialogDescription>
        </DialogHeader>
        <FriendCommandBox users={users} />
      </DialogContent>
    </Dialog>
  );
};

export default AddFriendModal;
