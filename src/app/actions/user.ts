"use server";
import { client } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import nodemailer from "nodemailer";

export const sendEmail = async (
  to: string,
  subject: string,
  text: string,
  html?: string
) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAILER_EMAIL,
      pass: process.env.MAILER_PASSWORD,
    },
  });

  const mailOptions = {
    to,
    subject,
    text,
    html,
  };

  return { transporter, mailOptions };
};

export const onAuthenticateUser = async () => {
  try {
    const user = await currentUser();

    if (!user) {
      return { status: 403 };
    }

    const userExist = await client.user.findUnique({
      where: {
        clerkid: user.id,
      },
      include: {
        workspace: true,
      },
    });
    if (userExist) {
      return { status: 200, user: userExist };
    }

    const newUser = await client.user.create({
      data: {
        clerkid: user.id,
        email: user.emailAddresses[0].emailAddress,
        firstname: user.firstName,
        lastname: user.lastName,
        image: user.imageUrl,
        studio: {
          create: {},
        },
        subscription: {
          create: {},
        },
        workspace: {
          create: {
            name: `${user.firstName}'s Workspace`,
            type: "PERSONAL",
          },
        },
      },
      include: {
        workspace: true,
        subscription: {
          select: {
            plan: true,
          },
        },
      },
    });

    if (newUser) {
      return { status: 201, user: newUser };
    } else {
      return { status: 400 };
    }
  } catch (error) {
    return { status: 500 };
  }
};

export const getNotifications = async () => {
  try {
    const user = await currentUser();

    if (!user) return { status: 404 };

    const notifications = await client.user.findUnique({
      where: {
        clerkid: user.id,
      },
      select: {
        notification: {
          select: {
            id: true,
            content: true,
          },
        },
      },
    });
    if (notifications?.notification && notifications.notification.length > 0) {
      return { status: 200, data: notifications };
    }

    return { status: 404, data: [] };
  } catch (error) {
    console.error("Error in getNotifications:", error);
    return { status: 400, data: [] };
  }
};

export const searchUsers = async (query: string) => {
  try {
    const user = await currentUser();

    if (!user) {
      return { status: 404 };
    }

    const users = await client.user.findMany({
      where: {
        OR: [
          { firstname: { contains: query, mode: "insensitive" } },
          { email: { contains: query, mode: "insensitive" } },
          { lastname: { contains: query, mode: "insensitive" } },
        ],
        NOT: [{ clerkid: user.id }],
      },
      select: {
        id: true,

        subscription: {
          select: {
            plan: true,
          },
        },
        firstname: true,
        lastname: true,
        image: true,
        email: true,
      },
    });

    if (users && users.length > 0) {
      return { status: 200, data: users };
    }

    return { status: 404, data: null };
  } catch (error) {
    return { status: 500, data: null };
  }
};

export const getPaymentInfo = async () => {
  try {
    const user = await currentUser();
    if (!user) {
      return { status: 401 };
    }

    const payment = await client.user.findUnique({
      where: {
        clerkid: user.id,
      },
      select: {
        subscription: {
          select: { plan: true },
        },
      },
    });

    if (payment) {
      return { status: 200, data: payment };
    }

    return { status: 404, data: null };
  } catch (error) {
    return { status: 500, data: null };
  }
};

export const getFirstView = async () => {
  try {
    const user = await currentUser();
    if (!user) return { status: 401 };
    const userData = await client.user.findUnique({
      where: {
        clerkid: user.id,
      },
      select: {
        firstView: true,
      },
    });
    if (userData) {
      return { status: 200, data: userData.firstView };
    }
    return { status: 404, data: false };
  } catch (error) {
    return { status: 500 };
  }
};

export const enableViewFirst = async (state: boolean) => {
  try {
    const user = await currentUser();

    if (!user) return { status: 401 };

    const view = await client.user.update({
      where: {
        clerkid: user.id,
      },
      data: {
        firstView: state,
      },
    });

    if (view) {
      return { status: 200, data: "Setting updated" };
    }
    return { status: 404, data: `Can't update, an error occurred` };
  } catch (error) {
    return { status: 500, data: null };
  }
};

export const createCommentAndReply = async (
  userId: string,
  comment: string,
  videoId: string,
  commentId?: string | undefined
) => {
  try {
    if (commentId) {
      const reply = await client.comment.update({
        where: {
          id: commentId,
        },
        data: {
          reply: {
            create: {
              comment,
              userId,
              videoId,
            },
          },
        },
      });

      if (reply) {
        return { status: 200, data: "Reply posted" };
      }
    }

    const newComment = await client.video.update({
      where: {
        id: videoId,
      },
      data: {
        comments: {
          create: {
            comment,
            userId,
          },
        },
      },
    });

    if (newComment) return { status: 200, data: "New comment added" };
  } catch (error) {
    return { status: 400 };
  }
};

export const getUserProfile = async () => {
  try {
    const user = await currentUser();

    if (!user) return { status: 404 };

    const profileAndImage = await client.user.findUnique({
      where: {
        clerkid: user.id,
      },
      select: {
        image: true,
        id: true,
        firstname: true,
        lastname: true,
      },
    });

    if (profileAndImage) return { status: 200, data: profileAndImage };
  } catch (error) {
    return { status: 400 };
  }
};

export const getVideoComments = async (id: string) => {
  try {
    const comments = await client.comment.findMany({
      where: {
        videoId: id,
        commentId: null,
      },
      include: {
        reply: {
          include: {
            User: true,
          },
        },
        User: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return { status: 200, data: comments };
  } catch (error) {
    return { status: 400 };
  }
};

export const inviteMembers = async (
  workspaceId: string,
  receiverId: string,
  email: string
) => {
  try {
    const user = await currentUser();

    if (!user) {
      return { status: 404 };
    }

    const senderInfo = await client.user.findUnique({
      where: {
        clerkid: user.id,
      },
      select: {
        id: true,
        firstname: true,
        lastname: true,
      },
    });

    if (senderInfo?.id) {
      const workspace = await client.workSpace.findUnique({
        where: {
          id: workspaceId,
        },
        select: {
          name: true,
        },
      });

      if (workspace) {
        const invitation = await client.invite.create({
          data: {
            senderId: senderInfo.id,
            receiverId,
            workSpaceId: workspaceId,
            content: `You are invited to join ${workspace.name} Workspace, click accept to confirm`,
          },
          select: {
            id: true,
          },
        });

        await client.user.update({
          where: {
            id: receiverId,
          },
          data: {
            notification: {
              create: {
                content: `${user.firstName} ${user.lastName} invited ${senderInfo.firstname} ${senderInfo.lastname} into ${workspace.name}`,
              },
            },
          },
        });

        if (invitation) {
          const { transporter, mailOptions } = await sendEmail(
            email,
            "You got an invitation",
            `You are invited to join ${workspace.name} Workspace, click accept to confirm`,
            `<a href="${process.env.NEXT_PUBLIC_HOST_URL}/invite/${invitation.id}" style="background-color: #000;
            padding: 5px 10px; border-radius: 10px;">Accept Invite</a>`
          );
          transporter.sendMail(mailOptions, async (error, info) => {
            if (error) {
              console.log("🔴", error.message);
            } else {
              console.log("✅ Email sent", info);
            }
          });
          return { status: 200, data: "Invite sent" };
        }

        return { status: 400, data: "Invitation failed" };
      }

      return { status: 400, data: "Workspace not found" };
    }
    return { status: 400, data: "recipient not found" };
  } catch (error) {
    return { status: 500, data: "Oops! something went wrong" };
  }
};

export const acceptInvite = async (inviteId: string) => {
  try {
    const user = await currentUser();

    if (!user) {
      return { status: 404 };
    }

    const invitation = await client.invite.findUnique({
      where: {
        id: inviteId,
      },
      select: {
        workSpaceId: true,
        receiver: {
          select: {
            clerkid: true,
          },
        },
      },
    });

    if (user.id !== invitation?.receiver?.clerkid) return { status: 401 };

    const acceptInvite = client.invite.update({
      where: {
        id: inviteId,
      },
      data: {
        accepted: true,
      },
    });

    const updateMember = client.user.update({
      where: {
        clerkid: user.id,
      },
      data: {
        members: {
          create: {
            workSpaceId: invitation.workSpaceId,
          },
        },
      },
    });

    const membersTransaction = await client.$transaction([
      acceptInvite,
      updateMember,
    ]);

    if (membersTransaction) {
      return { status: 200 };
    }
    return { status: 400 };
  } catch (error) {
    return { status: 500 };
  }
};

export const turnOnTrial = async (videoId: string) => {
  try {
    const user = await currentUser();
    if (!user) {
      return { status: 404 };
    }

    const userId = await client.user.findUnique({
      where: {
        clerkid: user.id,
      },
      select: {
        id: true,
      },
    });

    if (userId === null) {
      return { status: 404 };
    }

    const author = await client.video.findUnique({
      where: {
        id: videoId,
        userId: userId.id,
      },
    });

    if (author === null) {
      return { status: 401, message: "Unauthorized" };
    }

    await client.user.update({
      where: {
        clerkid: user.id,
      },
      data: {
        trial: true,
      },
    });

    return { status: 204, message: "Free Trial Activated" };
  } catch (error) {
    return {
      status: 500,
      message: "Internal Server Error",
      data: null,
      error: error,
    };
  }
};
