import prisma from "@/lib/db";

export async function GET(
  _req: Request,
  context: { params: Promise<{ postId: string }> }
) {
  const { postId } = await context.params;

  const comments = await prisma.comment.findMany({
    where: { postId },
    orderBy: { createdAt: "asc" },
  });

  return Response.json(
    comments.map((c) => ({
      id: c.id,
      userName: c.userName,
      description: c.description,
      time: c.createdAt.toISOString(),
      postId: c.postId,
    }))
  );
}
