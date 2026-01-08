"use client";

import { useActionState } from "react";
import { createPost } from "@/lib/actions/posts";
import Spinner from "../spinner";

interface PostFormProps {
  onClose: () => void;
}

const initialState = {
  success: false,
  error: undefined,
};

export default function PostForm({ onClose }: PostFormProps) {
  const [state, formAction, isPending] = useActionState(
    createPost,
    initialState
  );

  return (
    <form
      action={formAction}
      className="bg-white p-8 rounded-2xl border-2 border-indigo-500 text-indigo-400 relative"
    >
      {/* Close button */}
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 text-indigo-500 text-xl hover:text-indigo-700"
      >
        ✕
      </button>

      <h2 className="text-3xl font-bold text-center mb-8">Create a post</h2>

      {/* Error message */}
      {state.error && (
        <p className="mb-4 text-red-500 text-center">{state.error}</p>
      )}

      {/* Success message */}
      {state.success && (
        <p className="mb-4 text-green-600 text-center">
          Post created successfully!
        </p>
      )}

      {/* Title */}
      <div className="mb-6">
        <label htmlFor="title" className="block mb-2">
          Post Title:
        </label>
        <input
          id="title"
          name="title"
          type="text"
          placeholder="Post Title"
          required
          className="w-full px-4 py-3 rounded-lg bg-black focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Description */}
      <div className="mb-6">
        <label htmlFor="description" className="block mb-2">
          Post Description:
        </label>
        <textarea
          id="description"
          name="description"
          placeholder="Post Description"
          rows={5}
          required
          className="w-full px-4 py-3 rounded-lg bg-black resize-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Date */}
      <div className="mb-6">
        <label htmlFor="date" className="block mb-2">
          Date:
        </label>
        <input
          id="date"
          name="date"
          type="date"
          required
          className="w-full px-4 py-3 rounded-lg bg-black focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full py-3 rounded-lg bg-indigo-500 text-white font-semibold hover:bg-indigo-600 disabled:opacity-50"
      >
        {isPending ? (
          <>
            <Spinner />
            Creating...
          </>
        ) : (
          "Create Post"
        )}
      </button>
    </form>
  );
}
