
export const dynamic = "force-dynamic"; 

async function getPosts() {
  const res = await fetch("http://localhost:3000/api/posts", { cache: "no-store" });
  return res.json();
}

export default async function PostList() {
  const posts = await getPosts();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">📚 포스트 목록</h1>
      <a href="/post/write" className="text-blue-500 underline">➕ 새 글 작성</a>
      <ul className="mt-4 space-y-2">
        {posts.map((post) => (
          <li key={post.id} className="border p-4 rounded shadow">
            <a href={`/post/${post.id}`} className="text-lg font-semibold text-blue-700">{post.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
