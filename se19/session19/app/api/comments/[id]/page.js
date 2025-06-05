"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

async function getPost(id) {
  const res = await fetch(`/api/posts/${id}`);
  return res.json();
}

async function getComments(postId) {
  const res = await fetch(`/api/comments?postId=${postId}`);
  return res.json();
}

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  useEffect(() => {
    getPost(id).then(setPost);
    getComments(id).then(setComments);
  }, [id]);

  const handleAdd = async () => {
    if (!newComment.trim()) return;
    await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({ postId: id, text: newComment }),
    });
    setNewComment("");
    getComments(id).then(setComments);
  };

  const handleDelete = async (commentId) => {
    await fetch(`/api/comments/${commentId}`, { method: "DELETE" });
    getComments(id).then(setComments);
  };

  const handleEdit = async () => {
    await fetch(`/api/comments/${editingId}`, {
      method: "PUT",
      body: JSON.stringify({ text: editingText }),
    });
    setEditingId(null);
    setEditingText("");
    getComments(id).then(setComments);
  };

  if (!post) return <div className="p-8">로딩 중...</div>;

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

      <h2 className="text-xl font-bold mb-2">💬 댓글</h2>
      <ul className="space-y-2">
        {comments.map((c) => (
          <li key={c.id} className="border p-2 rounded">
            {editingId === c.id ? (
              <div>
                <input
                  className="border w-full p-1"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                />
                <div className="space-x-2 mt-1">
                  <button onClick={handleEdit} className="text-green-500">✔ 저장</button>
                  <button onClick={() => setEditingId(null)} className="text-gray-500">취소</button>
                </div>
              </div>
            ) : (
              <div className="flex justify-between items-center">
                <span>{c.text}</span>
                <div className="space-x-2 text-sm">
                  <button onClick={() => {
                    setEditingId(c.id);
                    setEditingText(c.text);
                  }} className="text-blue-500">수정</button>
                  <button onClick={() => handleDelete(c.id)} className="text-red-500">삭제</button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>

      <div className="mt-4">
        <textarea
          placeholder="댓글을 입력하세요"
          className="w-full border p-2 h-24"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button onClick={handleAdd} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
          댓글 작성
        </button>
      </div>
    </div>
  );
}
