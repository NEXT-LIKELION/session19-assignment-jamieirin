"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function EditPost({ params }) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    fetch(`/api/posts/${params.id}`)
      .then(res => res.json())
      .then(data => {
        setTitle(data.title);
        setContent(data.content);
      });
  }, [params.id]);

  const handleSubmit = async () => {
    await fetch(`/api/posts/${params.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });
    router.push(`/post/${params.id}`);
  };

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">✏️ 글 수정</h1>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border p-2 mb-4"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full border p-2 h-40 mb-4"
      />
      <button
        onClick={handleSubmit}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        수정 완료
      </button>
    </div>
  );
}
