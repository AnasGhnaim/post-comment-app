"use server";

interface ActionResult {
  success: boolean;
  error?: string;
}

export async function creatComment(
  _prevState: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  const description = formData.get("description") as string;
  const postId = formData.get("postId");

  if (!postId) {
    return {
      success: false,
      error: "Post not found.",
    };
  }

  if (!description || description.length < 10 || description.length > 1000) {
    return {
      success: false,
      error:
        "Missing required fields or the description length must be between 10 -1000 characters",
    };
  }
  return { success: true };
}
