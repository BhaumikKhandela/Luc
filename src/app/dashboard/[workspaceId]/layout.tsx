import { getNotifications, onAuthenticateUser } from "@/app/actions/user";
import {
  getAllUserVideos,
  getVideosWithNoFolder,
  getWorkspaceFolders,
  getWorkSpaces,
  verifyAccessToWorkspace,
} from "@/app/actions/workspace";
import { redirect } from "next/navigation";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import React from "react";
import Sidebar from "../../../components/global/sidebar";
import GlobalHeader from "@/components/global/global-header";
type Props = {
  params: { workspaceId: string };
  children: React.ReactNode;
};

const Layout = async ({ params, children }: Props) => {
  const { workspaceId } = await params;
  const auth = await onAuthenticateUser();

  if (
    auth.status === 403 ||
    auth.status === 400 ||
    auth.status === 500 ||
    !auth.user?.workspace ||
    !auth.user?.workspace.length
  ) {
    redirect("/auth/sign-in");
  }

  const hasAccess = await verifyAccessToWorkspace(workspaceId);

  if (hasAccess.status !== 200) {
    redirect(`/dashboard/${auth.user?.workspace[0].id}`);
  }

  if (!hasAccess.data?.workspace) {
    return (
      <div className="error-container">
        <h2>Workspace not found</h2>
        <p>
          The workspace you're trying to access doesn't exist or has been
          deleted.
        </p>
        <button
          onClick={() =>
            (window.location.href = `/dashboard/${auth.user?.workspace[0].id}`)
          }
        >
          Go to my workspace
        </button>
      </div>
    );
  }

  const query = new QueryClient();

  await query.prefetchQuery({
    queryKey: ["workspace-folders"],
    queryFn: () => getWorkspaceFolders(workspaceId),
  });

  await query.prefetchQuery({
    queryKey: ["videos-without-folder"],
    queryFn: () => getVideosWithNoFolder(workspaceId)
  })

  await query.prefetchQuery({
    queryKey: ["user-videos"],
    queryFn: () => getAllUserVideos(workspaceId),
  });

  await query.prefetchQuery({
    queryKey: ["user-workspaces"],
    queryFn: () => getWorkSpaces(),
  });

  await query.prefetchQuery({
    queryKey: ["user-notification"],
    queryFn: () => getNotifications(),
  });

  return (
    <HydrationBoundary state={dehydrate(query)}>
      <div className="flex h-screen w-screen">
        <Sidebar activeWorkSpaceId={workspaceId} />
        <div className="w-full pt-28 p-6 overflow-y-scroll overflow-x-hidden">
          <GlobalHeader workSpace={hasAccess.data.workspace} />
          <div className="mt-4">{children}</div>
        </div>
      </div>
    </HydrationBoundary>
  );
};

export default Layout;
