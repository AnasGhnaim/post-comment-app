"use server";

import prisma from "@/lib/db";

interface ActionResult {
  success: boolean;
  error?: string;
  comment?: {
    id: string;
    userName: string;
    description: string;
    time: string;
    postId: string;
  };
}

export async function creatComment(
  _prevState: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  const description = formData.get("description") as string;
  const postIdValue = formData.get("postId");

  if (!postIdValue || typeof postIdValue !== "string" || postIdValue === "") {
    return { success: false, error: "Post not found." };
  }

  if (!description || description.length < 10 || description.length > 1000) {
    return {
      success: false,
      error: "Description must be between 10 and 1000 characters",
    };
  }

  try {
    // Save comment to database
    const newComment = await prisma.comment.create({
      data: {
        userName: "Anonymous",
        description,
        postId: postIdValue,
      },
    });

    return {
      success: true,
      comment: {
        id: newComment.id,
        userName: newComment.userName,
        description: newComment.description,
        time: newComment.createdAt.toISOString(),
        postId: newComment.postId,
      },
    };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to create comment" };
  }
}
