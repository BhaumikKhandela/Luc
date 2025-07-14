import { client } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json(
      {
        message: "Unauthorized",
      },
      {
        status: 401,
      }
    );
  }

  try {
    await client.user.update({
      where: {
        clerkid: userId,
      },
      data: {
        subscription: {
          update: {
            plan: "PRO",
          },
        },
      },
    });

    return NextResponse.json(
      {
        message: "Subscription updated successfully",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Error updating subscription",
        error: error,
      },
      {
        status: 500,
      }
    );
  }
}
