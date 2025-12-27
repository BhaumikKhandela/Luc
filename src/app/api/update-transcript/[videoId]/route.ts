import { client } from "@/lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ videoId: string }> }
) {
  try {
    const { videoId } = await context.params;
    const body = await req.json();
    const parsedBody = transcriptSchema.safeParse(body);
    if (!parsedBody.success) {
      return NextResponse.json(
        {
          message: "Body not valid",
        },
        {
          status: 400,
        }
      );
    }
    const { transcription } = parsedBody.data;

    await client.video.update({
      where: {
        id: videoId,
      },
      data: {
        summary: transcription,
      },
    });

    return NextResponse.json(
      {
        message: "Transcription updated successfully",
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.log("An error occured in patch request");
    if (error instanceof PrismaClientKnownRequestError) {
      console.log("Prisma client error occurred");
      if (error.code === "P2025") {
        console.log("Video not found");
        return NextResponse.json(
          {
            message: "Video not found",
          },
          {
            status: 404,
          }
        );
      }
    }
    console.log("This is transcript update error:", error);
    return NextResponse.json(
      {
        message: "Internal Server error",
      },
      {
        status: 500,
      }
    );
  }
}

const transcriptSchema = z.object({
  transcription: z.string(),
});
