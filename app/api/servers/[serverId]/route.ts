import { authProfile } from "@/lib/auth-profile";
import { db } from "@/lib/db.prisma";
import { MemberType } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { v4 as UUID4 } from "uuid";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { serverId: string } }
) {
  try {
    const profile = await authProfile();

    if (!profile) {
      return new NextResponse(
        JSON.stringify({
          success: false,
          error: "Unauthorized user!",
        }),
        {
          status: 401,
          statusText: "Unauthorized",
        }
      );
    }

    if (!params.serverId) {
      return new NextResponse(
        JSON.stringify({
          success: false,
          error: "Missing server id!",
        }),
        {
          status: 400,
          statusText: "Bad Request",
        }
      );
    }

    const updatedServer = await db.server.update({
      where: {
        id: params.serverId,
        profileId: profile.id,
      },
      data: {
        invitationCode: UUID4(),
      },
    });

    return new NextResponse(
      JSON.stringify({
        success: true,
        data: updatedServer,
      }),
      {
        status: 200,
      }
    );
  } catch (e: any) {
    return new NextResponse(
      JSON.stringify({
        success: false,
        error: "Something went wrong with server!",
      }),
      {
        status: 500,
        statusText: "Internal server error",
      }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { serverId: string } }
) {
  try {
    const profile = await authProfile();

    if (!profile) {
      return new NextResponse(
        JSON.stringify({
          success: false,
          error: "Unauthorized user!",
        }),
        {
          status: 401,
          statusText: "Unauthorized",
        }
      );
    }

    if (!params.serverId) {
      return new NextResponse(
        JSON.stringify({
          success: false,
          error: "Missing server id!",
        }),
        {
          status: 400,
          statusText: "Bad Request",
        }
      );
    }

    await db.server.delete({
      where: {
        id: params.serverId,
        profileId: profile.id,
        members: {
          some: {
            profileId: profile.id,
            role: MemberType.ADMIN,
          },
        },
      },
    });

    return new NextResponse(
      JSON.stringify({
        success: true,
      }),
      {
        status: 200,
      }
    );
  } catch (e: any) {
    return new NextResponse(
      JSON.stringify({
        success: false,
        error: "Something went wrong with server!",
      }),
      {
        status: 500,
        statusText: "Internal server error",
      }
    );
  }
}
