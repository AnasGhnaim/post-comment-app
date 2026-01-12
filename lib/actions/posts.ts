"use server";
import prisma from "../db";

interface ActionResult {
  success: boolean;
  error?: string;
  post?: Post;
}

interface Post {
  id: string;
  title: string;
  description: string;
  time: string;
  image?: string;
}

export async function createPost(
  _prevState: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const date = formData.get("date") as string;
  const image = formData.get("image") as File | null;

  if (!title || !description || !date) {
    return { success: false, error: "Missing required fields" };
  }
  if (description.length < 10 || description.length > 1000) {
    return {
      success: false,
      error: "Description must be between 10 and 1000 characters",
    };
  }

  try {
    const newPost = await prisma.post.create({
      data: {
        title,
        description,
        time: new Date(date).toLocaleDateString(),
        image: null,
      },
    });

    const post: Post = {
      id: newPost.id,
      title: newPost.title,
      description: newPost.description,
      time: newPost.time as string,
      image: newPost.image ?? undefined,
    };

    return { success: true, post };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to create post" };
  }
}
