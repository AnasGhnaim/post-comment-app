"use server";

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

const dummyPosts: Post[] = [];

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

  const post: Post = {
    id: crypto.randomUUID(),
    title,
    description,
    time: new Date(date).toLocaleDateString(),
  };

  // Save to dummy array
  dummyPosts.unshift(post);

  return { success: true, post };
}
