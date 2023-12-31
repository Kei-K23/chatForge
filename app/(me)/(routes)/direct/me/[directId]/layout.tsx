import FriendSidebar from "@/components/friend/friend-sidebar";
import { authProfile } from "@/lib/auth-profile";
import { db } from "@/lib/db.prisma";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

const DirectMessageMeLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    directId: string;
  };
}) => {
  const profile = await authProfile();

  if (!profile) {
    return redirectToSignIn();
  }

  const server = await db.server.findUnique({
    where: {
      id: params.directId,
      name: "ChatForge",
    },
  });

  if (!server) {
    return redirect("/");
  }

  return (
    <div className="h-full">
      <div className="hidden h-full w-64 z-20 md:flex flex-col items-center fixed inset-y-0">
        <FriendSidebar serverId={server.id} directId={params.directId} />
      </div>
      <div className="h-full md:pl-64">{children}</div>
    </div>
  );
};

export default DirectMessageMeLayout;
