"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2, Trash, X } from "lucide-react";
import { useModal } from "@/hook/use-modal-store";
import { Button } from "../ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "../ui/use-toast";

const DeleteServerModal = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onClose, type, data } = useModal();
  const { server } = data;
  const isModalOpen = isOpen && type === "deleteServer";

  async function handleLeaveServer() {
    try {
      setIsLoading(true);
      const resServer = await fetch(`/api/servers/${server?.id}`, {
        method: "DELETE",
        cache: "no-cache",
      });
      const dataServer = await resServer.json();

      if (resServer.ok && dataServer.success) {
        router.push("/");
        router.refresh();
        onClose();
        toast({ title: `Successfully deleted the server` });
      } else {
        toast({ title: dataServer.error });
      }
    } catch (e: any) {
      setIsLoading(true);
      toast({ title: e.message });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl md:text-2xl flex items-center gap-2 justify-center">
            Delete Server
            <Trash className="w-5 h-5 md:w-9 md:h-9 text-red-500" />
          </DialogTitle>
          <DialogDescription className="text-center text-lg">
            <p>
              Are you sure you want to delete the server&apos;s{" "}
              <span className="text-indigo-500">{server?.name}</span> <br />
            </p>
            <h3 className="text-red-500 text-center">
              This will delete permanently the server!
            </h3>
          </DialogDescription>
          <div className="flex flex-col items-start">
            <DialogFooter className="w-full gap-y-3 mt-4">
              <Button onClick={onClose} disabled={isLoading}>
                Cancel
              </Button>
              <Button
                variant={"destructive"}
                disabled={isLoading}
                onClick={handleLeaveServer}
              >
                Confirm
                {isLoading ? (
                  <Loader2 className="animate-spin w-4 h-4 ml-2" />
                ) : (
                  <Trash className="w-4 h-4 ml-2" />
                )}
              </Button>
            </DialogFooter>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteServerModal;
