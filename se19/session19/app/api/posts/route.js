let posts = []; // 서버 메모리 내 임시 DB

export async function GET() {
  return Response.json(posts);
}

export async function POST(req) {
  const { title, content } = await req.json();
  const newPost = {
    id: Date.now().toString(),
    title,
    content,
  };
  posts.unshift(newPost);
  return Response.json({ message: "Created", post: newPost });
}

let posts = []; // 동일한 메모리 DB 사용

export async function GET(req, { params }) {
  const post = posts.find((p) => p.id === params.id);
  if (!post) return new Response("Not found", { status: 404 });
  return Response.json(post);
}

export async function PUT(req, { params }) {
  const { title, content } = await req.json();
  const idx = posts.findIndex((p) => p.id === params.id);
  if (idx === -1) return new Response("Not found", { status: 404 });

  posts[idx] = { ...posts[idx], title, content };
  return Response.json(posts[idx]);
}

export async function DELETE(req, { params }) {
  const idx = posts.findIndex((p) => p.id === params.id);
  if (idx === -1) return new Response("Not found", { status: 404 });

  posts.splice(idx, 1);
  return Response.json({ message: "Deleted" });
}
