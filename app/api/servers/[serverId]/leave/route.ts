import { authProfile } from "@/lib/auth-profile";
import { db } from "@/lib/db.prisma";
import { NextRequest, NextResponse } from "next/server";

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

    const server = await db.server.update({
      where: {
        id: params.serverId,
        profileId: {
          not: profile.id,
        },
        members: {
          some: {
            profileId: profile.id,
          },
        },
      },
      data: {
        members: {
          deleteMany: {
            profileId: profile.id,
          },
        },
      },
    });

    return new NextResponse(
      JSON.stringify({
        success: true,
        data: server,
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
