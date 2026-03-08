import React, { useState } from "react";
import type { Note } from "../types";

interface NoteFormProps {
  onAdd: (note: Note) => void;
  onTogglePin: (id: number) => void; 
}

const NoteForm: React.FC<NoteFormProps> = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

 const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  if (!title.trim() && !content.trim()) return;

  // Only id, title, content, pinned
  onAdd({
    id: Date.now(),
    title,
    content,
    pinned: false,
    text: ""
  });

  setTitle("");
  setContent("");
};

  return (
    <form onSubmit={handleSubmit} className="bg-pink-100 p-4 rounded-xl mb-6 shadow-md w-full max-w-lg">
      <h2 className="text-lg font-bold text-pink-600 mb-2">New Note</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 mb-2 border border-pink-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-2 mb-2 border border-pink-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
      />
      <button
        type="submit"
        className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 transition"
      >
        Create Note
      </button>
    </form>
  );
};

export default NoteForm;