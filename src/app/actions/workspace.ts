"use server";

import { client } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { sendEmail } from "./user";

export const verifyAccessToWorkspace = async (workspaceId: string) => {
  try {
    const user = await currentUser();
    if (!user) return { status: 401 };

    const isUserInWorkspace = await client.workSpace.findUnique({
      where: {
        id: workspaceId,
        OR: [
          {
            User: {
              clerkid: user.id,
            },
          },
          {
            members: {
              some: {
                User: {
                  clerkid: user.id,
                },
              },
            },
          },
        ],
      },
    });

    return { status: 200, data: { workspace: isUserInWorkspace } };
  } catch (error) {
    return { status: 500, data: { workspace: null } };
  }
};

export const getWorkspaceFolders = async (workspaceId: string) => {
  try {
    const isFolders = await client.folder.findMany({
      where: {
        workSpaceId: workspaceId,
      },
      include: {
        _count: {
          select: {
            videos: true,
          },
        },
      },
    });

    if (isFolders && isFolders.length > 0) {
      return { status: 200, data: isFolders };
    }
    return { status: 404, data: [] };
  } catch (error) {
    return { status: 403, data: [] };
  }
};

export const getAllUserVideos = async (folderId: string) => {
  try {
    const user = await currentUser();
    if (!user) return { status: 404 };

    const videos = await client.video.findMany({
      where: {
        folderId: folderId,
      },
      select: {
        id: true,
        title: true,
        createdAt: true,
        source: true,
        processing: true,
        Folder: {
          select: {
            id: true,
            name: true,
          },
        },
        User: {
          select: {
            firstname: true,
            lastname: true,
            image: true,
          },
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    if (videos && videos.length > 0) {
      return { status: 200, data: videos };
    }

    return { status: 405 };
  } catch (error) {
    return { status: 400 };
  }
};

export const getWorkSpaces = async () => {
  try {
    const user = await currentUser();
    if (!user) return { status: 404 };

    const workspaces = await client.user.findUnique({
      where: {
        clerkid: user.id,
      },
      select: {
        subscription: {
          select: {
            plan: true,
          },
        },
        workspace: {
          select: {
            id: true,
            name: true,
            type: true,
          },
        },

        members: {
          select: {
            WorkSpace: {
              select: {
                id: true,
                name: true,
                type: true,
              },
            },
          },
        },
      },
    });

    if (workspaces) {
      return { status: 200, data: workspaces };
    }

    return { status: 404, data: [] };
  } catch (error) {
    return { status: 400 };
  }
};

export const searchContentsOfWorkspace = async (
  searchQuery: string,
  workspaceId: string
) => {
  try {
    const user = await currentUser();
    if (!user) {
      return { status: 404 };
    }

    const searchResult = await client.workSpace.findFirst({
      where: {
        AND: [
          { id: workspaceId }, // Ensures search is within this workspace
          {
            OR: [
              {
                members: {
                  some: {
                    User: {
                      OR: [
                        {
                          firstname: {
                            contains: searchQuery,
                            mode: "insensitive",
                          },
                        },
                        {
                          lastname: {
                            contains: searchQuery,
                            mode: "insensitive",
                          },
                        },
                      ],
                    },
                  },
                },
              },
              { name: { contains: searchQuery, mode: "insensitive" } },
              {
                folders: {
                  some: {
                    name: { contains: searchQuery, mode: "insensitive" },
                  },
                },
              },
              {
                videos: {
                  some: {
                    title: { contains: searchQuery, mode: "insensitive" },
                  },
                },
              },
            ],
          },
        ],
      },
      select: {
        members: {
          select: {
            User: {
              select: {
                firstname: true,
                lastname: true,
              },
            },
          },
        },
        folders: {
          select: { name: true },
        },
        videos: {
          select: { title: true },
        },
      },
    });

    if (searchResult) {
      const formattedResult = {
        members: searchResult.members.map((item) => ({
          firstname: item.User?.firstname,
          lastname: item.User?.lastname,
        })),
        folders: searchResult.folders.map((item) => item.name),
        videos: searchResult.videos.map((item) => item.title),
      };

      return {
        status: 200,
        message: "Fetched data successfully",
        data: formattedResult,
      };
    }

    return { status: 404, message: "No data found", data: [] };
  } catch (error) {
    return {
      status: 500,
      message: "Internal Server Error",
      data: [],
      error: error,
    };
  }
};

export const createWorkspace = async (name: string) => {
  try {
    const user = await currentUser();

    if (!user) {
      return { status: 404 };
    }

    const authorized = await client.user.findUnique({
      where: {
        clerkid: user.id,
      },
      select: {
        subscription: {
          select: {
            plan: true,
          },
        },
      },
    });

    if (authorized?.subscription?.plan === "PRO") {
      const workspace = await client.user.update({
        where: {
          clerkid: user.id,
        },
        data: {
          workspace: {
            create: {
              name,
              type: "PUBLIC",
            },
          },
        },
      });
      if (workspace) {
        return {
          status: 201,
          message: "Workpsace created successfully",
          data: workspace,
        };
      }
    }

    return {
      status: 401,
      message: "You are not authorized to create a workspace.",
    };
  } catch (error) {
    return { status: 400, message: "An error occurred", error: error };
  }
};

export const renameFolders = async (folderId: string, name: string) => {
  try {
    const user = currentUser();

    if (!user) {
      return {
        status: 401,
      };
    }

    const folder = await client.folder.update({
      where: {
        id: folderId,
      },
      data: {
        name,
      },
    });

    if (folder) {
      return { status: 200, message: "Folder renamed" };
    }

    return { status: 404, message: "Folder does not exist" };
  } catch (error) {
    return { status: 500, message: "Opps ! something went wrong" };
  }
};

export const createFolder = async (workspaceId: string) => {
  try {
    const user = await currentUser();

    if (!user) {
      return { status: 401 };
    }

    const folder = await client.folder.create({
      data: {
        name: "Untitled Folder",
        workSpaceId: workspaceId,
      },
    });

    if (folder) {
      return { status: 200, message: "Folder created successfully" };
    }

    return { status: 404, message: "Failed to create folder" };
  } catch (error) {
    return { status: 500, message: "Opps ! something went wrong" };
  }
};

export const getFolderInfo = async (folderId: string) => {
  try {
    const user = await currentUser();
    if (!user) {
      return { status: 401 };
    }

    const folder = await client.folder.findUnique({
      where: {
        id: folderId,
      },
      select: {
        id: true,
        name: true,
        _count: {
          select: {
            videos: true,
          },
        },
      },
    });

    if (folder) {
      return {
        status: 200,
        message: "Folder info fetched successfully",
        data: folder,
      };
    }
    return { status: 404, message: "Folder not found", data: null };
  } catch (error) {
    return { status: 500, message: "Opps ! something went wrong", data: null };
  }
};

export const moveVideoLocation = async (
  videoId: string,
  workspaceId: string,
  folderId: string
) => {
  try {
    const user = await currentUser();
    if (!user) {
      return { status: 401 };
    }
    const location = await client.video.update({
      where: {
        id: videoId,
      },
      data: {
        folderId: folderId || null,
        workSpaceId: workspaceId,
      },
    });

    if (location) {
      return {
        status: 200,
        message: "Location updated successfully",
        data: location,
      };
    }
    return { status: 404, message: "Location update failed", data: null };
  } catch (error) {
    return { status: 500, message: "Opps ! something went wrong", data: null };
  }
};

export const getPreviewVideo = async (videoId: string) => {
  try {
    const user = await currentUser();

    if (!user) {
      return { status: 401 };
    }

    const video = await client.video.findUnique({
      where: {
        id: videoId,
      },
      select: {
        title: true,
        createdAt: true,
        source: true,
        description: true,
        processing: true,
        views: true,
        summary: true,
        User: {
          select: {
            firstname: true,
            lastname: true,
            image: true,
            clerkid: true,
            trial: true,
            subscription: {
              select: {
                plan: true,
              },
            },
          },
        },
      },
    });

    if (video) {
      return {
        status: 200,
        data: video,
        author: user.id === video.User?.clerkid ? true : false,
      };
    }

    return { status: 404, message: "Video not found" };
  } catch (error) {
    return { status: 500, message: "Opps ! something went wrong", data: null };
  }
};

export const sendEmailForFirstView = async (videoId: string) => {
  try {
    const user = await currentUser();

    if (!user) {
      return { status: 401 };
    }

    const firstViewSettings = await client.user.findUnique({
      where: {
        clerkid: user.id,
      },
      select: {
        firstView: true,
      },
    });

    if (!firstViewSettings?.firstView) return;

    const video = await client.video.findUnique({
      where: {
        id: videoId,
      },
      select: {
        title: true,
        views: true,
        User: {
          select: {
            email: true,
          },
        },
      },
    });

    if (video && video.views === 0) {
      await client.video.update({
        where: {
          id: videoId,
        },
        data: {
          views: video.views + 1,
        },
      });
    }

    if (!video) return;
    const { transporter, mailOptions } = await sendEmail(
      video.User?.email!,
      "You got a viewer",
      `Your video ${video?.title} just got its first view`
    );

    transporter.sendMail(mailOptions, async (error, info) => {
      if (error) {
        console.log(error.message);
      } else {
        const notification = await client.user.update({
          where: {
            clerkid: user.id,
          },
          data: {
            notification: {
              create: {
                content: mailOptions.text,
              },
            },
          },
        });
        if (notification) {
          return { status: 200 };
        }
      }
    });
  } catch {
    return { status: 500, message: "Opps ! something went wrong", data: null };
  }
};

export const editVideoInfo = async (videoId: string, title: string, description: string) => {
  try{
    const user = await currentUser();
    
    if(!user){
        return { status: 401 };
    }

    const updateVideo = await client.video.update({
      where:{
        id: videoId
      },
      data:{
        title,
        description
      }
    });


    return { status: 200, message: "Video info updated successfully" };

  }catch(error){
    console.error('🔴 Error updating video info:', error);
    return { status: 500, message: "Opps ! something went wrong" };
  }
}

export const getVideosWithNoFolder = async (workspaceId: string) => {
  try{
    const user = await currentUser();

    if(!user){
      return { status: 401 };
    }

    const videos = await client.video.findMany({
      where:{
        workSpaceId: workspaceId,
        folderId: null
      },
      select: {
        id: true,
        title: true,
        createdAt: true,
        source: true,
        processing: true,
        workSpaceId: true,
        Folder: {
          select: {
            id: true,
            name: true,
          },
        },
        User: {
          select: {
            firstname: true,
            lastname: true,
            image: true,
          },
        },
      },
      orderBy: {
        createdAt: "asc",
      }
    });
    
    if(videos && videos.length > 0){
      return { status: 200, data: videos };
    }
    return { status: 404, data: [] };
  }catch(error){
    return { status: 500, data: [] };
  }
}
export const getRecentVideos = async (workspaceId: string) => {
try{
  const user = currentUser();

  if(!user){
    return { status: 401}
  }

  const videos = await client.video.findMany({
    where:{
      workSpaceId: workspaceId
    },
    select: {
      id: true,
      title: true,
      description: true,
      createdAt: true,
      views: true,
      source: true,
      processing: true,
      workSpaceId: true,
      comments: {
        select:{
          comment: true,
          id: true
        }
      }
    },
    orderBy:{
      createdAt: 'desc'
    },
    take:5
  });

  if(videos && videos.length > 0){
    return { status: 200 , data: videos}
  }
  return { status: 404, data: [] }
} catch(error) {
  console.error('🔴 An error occurred while getting recent videos', error);

  return { status: 500, data: [] }
}
}

export const getTotalViewsAndComments = async(workspaceId: string) => {
  try{

    const user = currentUser();

    if(!user){
      return { status: 401 }
    }

    const totalViews = await client.video.aggregate({
      where: {workSpaceId: workspaceId},
      _sum: { views: true}
    });

    const totalComments = await client.comment.count({
      where: {
        Video:{
          workSpaceId: workspaceId
        }
      }
    });


    const totalViewCount = totalViews._sum.views || 0;

    return { status: 200, data: { totalViews: totalViewCount, totalComments: totalComments}}
  
  } catch(error){
    console.log('🔴 An error occurred while quering total views and comments');
    return { status: 500, data: { totalViews: 0, totalComments: 0}}
  }
}