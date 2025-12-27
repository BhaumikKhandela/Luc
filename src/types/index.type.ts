export type WorkspaceProps = {
  data: {
    subscription: {
      plan: "FREE" | "PRO";
    } | null;
    workspace: {
      id: string;
      name: string;
      type: "PUBLIC" | "PERSONAL";
    }[];
    members: {
      WorkSpace: {
        id: string;
        name: string;
        type: "PUBLIC" | "PERSONAL";
      };
    }[];
  };
};

export interface NotificationProps {
  status: number;
  data: {
    _count: {
      notification: number;
    };
  };
}

export type FolderProps = {
  status: number;
  data: {
    name: string;
    _count: {
      videos: number;
    };
  };
};

export type VideosProps = {
  status: number;
  data: {
    User: {
      firstname: string | null;
      lastname: string | null;
      image: string | null;
    } | null;
    id: string;
    processing: boolean;
    Folder: {
      id: string;
      name: string;
    } | null;
    createdAt: Date;
    title: string | null;
    source: string;
  }[];
};

export type VideoProps = {
  status: number;
  data: {
    User: {
      firstname: string | null;
      lastname: string | null;
      image: string | null;
      clerkid: string;
      trial: boolean;
      subscription: {
        plan: "PRO" | "FREE";
      } | null;
    } | null;
    title: string | null;
    description: string | null;
    source: string;
    views: number;
    createdAt: Date;
    processing: boolean;
    summary:  string | null;
  };
  author: boolean;
};

export type CommentRepliesProps = {
  id: string;
  comment: string;
  createdAt: Date;
  commentId: string | null;
  userId: string | null;
  videoId: string | null;
  User: {
    id: string;
    email: string;
    firstname: string | null;
    lastname: string | null;
    createdAt: Date;
    clerkid: string;
    image: string | null;
    trial: boolean;
    firstView: boolean;
  } | null;
};

export type VideoCommentProps = {
  data: {
    User: {
      id: string;
      email: string;
      firstname: string | null;
      lastname: string | null;
      createdAt: Date;
      clerkid: string;
      image: string | null;
      trial: boolean;
      firstView: boolean;
    } | null;
    reply: CommentRepliesProps[];
    id: string;
    comment: string;
    createdAt: Date;
    commentId: string | null;
    userId: string | null;
    videoId: string | null;
  }[];
};

export type RecentVideoTypes = {
  status: number,
  data:{
    id: string,
  workspaceId: string,
  title: string,
  description: string,
  createdAt: string,
  comments: {
    id: string,
    comment: string
  }[],
  views: number,
  
  processing: boolean,
  workSpaceId: string,
  source: string

  }[] 
  }

export enum Period{
    LAST_7_DAYS = 'Last 7 days',
    LAST_24_HOURS = 'Last 24 hours',
    LAST_30_DAYS = 'Last 30 days',
    LAST_6_MONTHS = 'Last 6 months',
    LAST_1_YEAR = 'Last 1 year',
    LIFETIME = 'Lifetime'
}

export type AnalyticsDataPoint = {
  date: string;
  views: number;
  comments: number;
};

export type VideoAnalyticsSuccessData = {
  analytics: AnalyticsDataPoint[];
  totalViews: number;
  totalComments: number;
};

export type VideoAnalytics = {
  status: number,
  data: VideoAnalyticsSuccessData;
}