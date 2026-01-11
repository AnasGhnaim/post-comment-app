"use client";

import { useActionState, useEffect } from "react";
import { socket } from "@/lib/socket";
import { creatComment } from "@/lib/actions/comments";
import Spinner from "../spinner";

interface CommentFormProps {
  postId: string;
}

const initialState = {
  success: false,
  error: undefined,
  comment: undefined,
};

export default function CommentForm({ postId }: CommentFormProps) {
  const [state, formAction, isPending] = useActionState(
    creatComment,
    initialState
  );

  useEffect(() => {
    if (state.success && state.comment) {
      socket.emit("create-comment", state.comment);
    }
  }, [state.success, state.comment, postId]);

  return (
    <div>
      <form
        action={formAction}
        className="bg-white p-2  border-t-2   border-indigo-500 text-indigo-600 "
      >
        {/* Hidden input so server action knows post */}
        <input type="hidden" name="postId" value={postId} />

        {/* Error message */}
        {state.error && (
          <p className="mb-4 text-red-500 text-center">{state.error}</p>
        )}

        {/* Success message */}
        {state.success && (
          <p className="mb-4 text-green-600 text-center">
            Comment created successfully!
          </p>
        )}

        <label htmlFor="description" className="block mb-2">
          Write your comment:
        </label>
        <textarea
          id="description"
          name="description"
          placeholder="Type your comment here"
          rows={5}
          required
          className="w-full px-4 py-3 rounded-lg text-black  bg-indigo-500 resize-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="submit"
          className="w-40 py-3  rounded-lg bg-indigo-500 text-white text-center font-semibold hover:bg-indigo-700 "
        >
          {isPending ? (
            <>
              <Spinner />
              creating...
            </>
          ) : (
            "Create comment"
          )}
        </button>
      </form>
    </div>
  );
}
