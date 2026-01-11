"use server";

interface ActionResult {
  success: boolean;
  error?: string;
  comment?: Comment;
}

interface Comment {
  commentId: string;
  userName: string;
  time: string;
  description: string;
  postId: string;
}

export async function creatComment(
  _prevState: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  const description = formData.get("description") as string;
  const postIdValue = formData.get("postId");

  if (!postIdValue || typeof postIdValue !== "string") {
    return {
      success: false,
      error: "Post not found.",
    };
  }

  const postId = postIdValue;

  if (!description || description.length < 10 || description.length > 1000) {
    return {
      success: false,
      error:
        "Missing required fields or the description length must be between 10 -1000 characters",
    };
  }
  const comment: Comment = {
    commentId: crypto.randomUUID(),
    userName: "Anonymous",
    time: "just now",
    description,
    postId,
  };

  return { success: true, comment };
}
