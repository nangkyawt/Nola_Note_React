/* eslint-disable react-hooks/set-state-in-effect */
import React, { useState, useEffect } from "react";
import type { Note, NewNote } from "../types";

interface NoteFormProps {
  onAdd: (note: NewNote) => Promise<void>;
  noteToEdit?: Note | null;
  onClose?: () => void;
}

const NoteForm: React.FC<NoteFormProps> = ({ onAdd, noteToEdit, onClose }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [color, setColor] = useState("#ffffff");

  useEffect(() => {
    if (noteToEdit) {
      setTitle(noteToEdit.title);
      setContent(noteToEdit.content);
      setColor(noteToEdit.color);
    }
  }, [noteToEdit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() && !content.trim()) return;

    const newNote: NewNote = {
      title,
      content,
      pinned: noteToEdit?.pinned ?? false,
      color,
      emoji: noteToEdit?.emoji || "📝",
      tags: noteToEdit?.tags || [],
      text: noteToEdit?.text || "",
    };

    console.log("Adding note:", newNote);
    await onAdd(newNote);

    setTitle("");
    setContent("");
    setColor("#ffffff");

    if (onClose) onClose();
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
      <input
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        className="mb-3 w-full h-8 border rounded"
      />
      <button
        type="submit"
        className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 transition"
      >
        {noteToEdit ? "Update Note" : "Create Note"}
      </button>
    </form>
  );
};

export default NoteForm;