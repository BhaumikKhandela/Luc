import { client } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const body = await req.json();
    const { id } = await context.params;

    const personalworkspaceId = await client.user.findUnique({
      where: {
        id,
      },
      select: {
        workspace: {
          where: {
            type: "PERSONAL",
          },
          select: {
            id: true,
          },
          orderBy: {
            createdAt: "asc",
          },
        },
        subscription:{
            select:{
                plan: true
            }
        }
      },

    });

    if (!personalworkspaceId) {
      return NextResponse.json({
        status: 400,
        message: "Personal workspace not found",
      });
    }


    const startProcessingVideo  = await client.video.create({
        data:{
            userId: id,
            workSpaceId:personalworkspaceId?.workspace[0].id ,
            source: body.filename
        },
        select:{
            id: true
        }
    })
  

    if (startProcessingVideo) {
      return NextResponse.json({
        status: 200,
        plan: personalworkspaceId.subscription?.plan,
        videoId: startProcessingVideo.id
      });
    }

    return NextResponse.json({
      status: 400,
      message: "Oops! something went wrong",
    });
  } catch (error) {
    console.log("🔴Error in processing video", error);

    return NextResponse.json({ status: 500, message: "Internal Server Error" });
  }
}
