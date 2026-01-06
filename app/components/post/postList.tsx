"use client";

import { useState } from "react";
import Image from "next/image";

import Modal from "./modal";
import PostForm from "./postForm";
import CommentsList from "../comment/commentList";

const posts = [
  {
    id: "1",
    Title: "Meta AI",
    Decription:
      "Meta AI was published in 2023 and added to Instagram and Facebook.",
    Image: "/post-images/coding-event.jpg",
    Time: "22 Feb 2025",
  },
  {
    id: "2",
    Title: "Meta AI",
    Decription:
      "Meta AI was published in 2023 and added to Instagram and Facebook.",
    Image: "/post-images/coding-event.jpg",
    Time: "22 Feb 2025",
  },
  {
    id: "3",
    Title: "Meta AI",
    Decription:
      "Meta AI was published in 2023 and added to Instagram and Facebook.",
    Image: "/post-images/coding-event.jpg",
    Time: "22 Feb 2025",
  },
];

export default function PostList() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [activePostId, setActivePostId] = useState<string | null>(null);

  return (
    <section className="mt-16 px-6 md:px-12 font-sans">
      <h1 className="text-4xl font-bold text-center text-indigo-700 mb-12">
        Posts
      </h1>

      {/* Create post button */}
      <button
        onClick={() => setIsCreateOpen(true)}
        className="bg-indigo-500 text-white px-5 py-2 rounded mb-6 hover:bg-indigo-600"
      >
        + Create Post
      </button>

      {/* Posts grid */}
      <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white border-2 border-indigo-500 rounded-xl shadow-md hover:shadow-xl transition-shadow p-6"
          >
            {/* Image */}
            <div className="flex justify-center mb-6">
              <Image
                src={post.Image}
                alt={post.Title}
                width={120}
                height={120}
                preload
                className="rounded-lg object-cover"
              />
            </div>

            <h2 className="text-2xl font-semibold text-indigo-700 mb-2 text-center">
              {post.Title}
            </h2>

            <p className="text-sm text-gray-500 text-center mb-4">
              📅 {post.Time}
            </p>

            <p className="text-gray-600 text-center leading-relaxed mb-4">
              {post.Decription}
            </p>

            {/* Open comments */}
            <button
              onClick={() => setActivePostId(post.id)}
              className="w-full border-2 border-indigo-700 bg-indigo-700 text-white rounded-xl py-2 hover:bg-indigo-900"
            >
              View Comments
            </button>
          </div>
        ))}
      </div>

      {/* Create Post Modal */}
      <Modal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)}>
        <PostForm onClose={() => setIsCreateOpen(false)} />
      </Modal>

      {/* Comments Modal */}
      <Modal
        isOpen={activePostId !== null}
        onClose={() => setActivePostId(null)}
      >
        <CommentsList postId={activePostId} />
      </Modal>
    </section>
  );
}
