"use client";
import { useEffect, useState } from "react";
import { socket } from "@/lib/socket";
import CommentForm from "./commentForm";

interface Comment {
  commentId: string;
  userName: string;
  time: string;
  description: string;
}

interface CommentsListProps {
  postId: string | null;
}

export default function CommentsList({ postId }: CommentsListProps) {
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    if (!postId) return;

    socket.emit("join-post", postId);

    socket.on("comments:init", (initialComments: Comment[]) => {
      setComments(initialComments);
    });

    socket.on("new-comment", (comment: Comment) => {
      setComments((prev) => [...prev, comment]);
    });

    return () => {
      socket.emit("leave-post", postId);
      socket.off("new-comment");
      socket.off("comments:init");
    };
  }, [postId]);

  if (!postId) return null;
  return (
    <div className="bg-white p-4 rounded-2xl border-2 border-indigo-500 text-indigo-700 relative ">
      <h2 className="text-2xl">Comments</h2>
      <div className="flex flex-col gap-2 mb-2 font-sans ">
        {comments.map((c) => (
          <div
            key={c.commentId}
            className="grid grid-rows gap-0.5 text-sm text-black mt-4 px-0.5 border border-black bg-indigo-500 "
          >
            <h2 className="text-xl">{c.userName}</h2>
            <h3
              className="
             text-sm text-white"
            >
              ({c.time})
            </h3>
            <div className="flex text-sm mt-0.5 mb-0.5">
              <p className="flex ">{c.description}</p>
            </div>
          </div>
        ))}
      </div>
      <CommentForm postId={postId} />
    </div>
  );
}
