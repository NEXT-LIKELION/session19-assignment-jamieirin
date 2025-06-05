let comments = []; // 메모리 댓글 DB

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const postId = searchParams.get("postId");

  const result = comments.filter((c) => c.postId === postId);
  return Response.json(result);
}

export async function POST(req) {
  const { postId, text, user = "익명" } = await req.json();
  const newComment = {
    id: Date.now().toString(),
    postId,
    text,
    user,
    createdAt: new Date().toISOString(),
  };
  comments.push(newComment);
  return Response.json(newComment);
}
