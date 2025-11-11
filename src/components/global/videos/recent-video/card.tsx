import Link from "next/link";

type Props = {
  id: string;
  workspaceId: string;
  title: string;
  description: string;
  views: number;
  comments: {
    id: string;
    comment: string;
  }[];
  source: string;
  createdAt: string;
};

function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();

  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return "Today";
  } else if (diffDays === 1) {
    return "Yesterday";
  } else if (diffDays < 7) {
    return `${diffDays} days ago`;
  } else if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);
    return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
  } else {
    const months = Math.floor(diffDays / 30);
    return `${months} month${months > 1 ? "s" : ""} ago`;
  }
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

const RecentVideoCard = ({
  id,
  workspaceId,
  title,
  description,
  views,
  comments,
  createdAt,
  source,
}: Props) => {
  return (
    <div className="border-[1px] border-[#2d2d2d] rounded-lg p-4 my-5">
      <h4 className="text-[#BDBDBD]">{formatRelativeTime(createdAt)}</h4>
      <p className="text-white text-sm">{formatDate(createdAt)}</p>

      <div className="flex gap-2 mt-3">
        <div className="flex flex-col justify-center items-center">
          <span className="text-gray-400 text-sm">{views} people watched</span>
          <p className="text-lg font-semibold text-white">{title}</p>
        </div>

        <div className="p-5">
          <Link
            href={`/dashboard/${workspaceId}/video/${id}`}
            className="hover:bg-[#252525] transition duration-150 flex flex-col justify-between h-full rounded-md"
          >
            <video
              controls={false}
              preload="metadata"
              className="w-full aspect-video opacity-80 rounded-md"
            >
              <source
                src={`${process.env.NEXT_PUBLIC_CLOUD_FRONT_STREAM_URL}/${source}#t=1`}
              />
            </video>
          </Link>
        </div>
      </div>

      {/* 🧵 Reddit-like Comment Section */}
      <div className="mt-6 border-t border-[#3a3a3a] pt-4">
        <h3 className="text-white font-semibold mb-3">
          Comments ({comments.length})
        </h3>

        {comments.length === 0 && (
          <p className="text-gray-500 text-sm">No comments yet.</p>
        )}

        <div className="space-y-4">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="flex items-start space-x-3 border border-[#333] p-3 rounded-md bg-[#1a1a1a]"
            >
              {/* Placeholder avatar */}
              <div className="w-9 h-9 rounded-full bg-[#2d2d2d] flex items-center justify-center text-sm font-semibold text-gray-400">
                {comment.comment.charAt(0).toUpperCase()}
              </div>

              <div className="flex-1">
                <p className="text-gray-300 text-sm">{comment.comment}</p>
                <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                  <button className="hover:text-blue-400">Upvote</button>
                  <button className="hover:text-blue-400">Downvote</button>
                  <button className="hover:text-blue-400">Reply</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentVideoCard;
