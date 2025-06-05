let comments = []; // 동일한 메모리 DB

export async function PUT(req, { params }) {
  const { text } = await req.json();
  const idx = comments.findIndex((c) => c.id === params.id);
  if (idx === -1) return new Response("Not found", { status: 404 });

  comments[idx].text = text;
  return Response.json(comments[idx]);
}

export async function DELETE(req, { params }) {
  const idx = comments.findIndex((c) => c.id === params.id);
  if (idx === -1) return new Response("Not found", { status: 404 });

  comments.splice(idx, 1);
  return Response.json({ message: "Deleted" });
}
