export const dynamic = "force-dynamic";

async function getPost(id) {
  const res = await fetch(`http://localhost:3000/api/posts/${id}`, { cache: "no-store" });
  return res.json();
}

export default async function PostDetail({ params }) {
  const post = await getPost(params.id);

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold">{post.title}</h1>
      <p className="mt-4">{post.content}</p>

      <div className="mt-6 space-x-4">
        <a href={`/post/edit/${post.id}`} className="text-blue-500 underline">✏️ 수정</a>
        <form action={`/api/posts/${post.id}`} method="POST" className="inline">
          <input type="hidden" name="_method" value="DELETE" />
          <button type="submit" className="text-red-500 underline ml-4">🗑 삭제</button>
        </form>
      </div>

      <hr className="my-6" />
      <h2 className="text-xl font-bold">💬 댓글 (추가 예정)</h2>
    </div>
  );
}
