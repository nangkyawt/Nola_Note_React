/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import NewNoteCard from "./components/NewNoteCard";
import NoteCard from "./components/NoteCards";
import type { Note, NewNote } from "./types";
import { getNotes, createNote, deleteNote, updateNote } from "./service/api";
import Navbar from "./components/Navbar";
import NoteIcon from "./assets/images/note.png";
import { SearchIcon } from "@heroicons/react/outline";

const App: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [showNewNote, setShowNewNote] = useState(false);
  const [search, setSearch] = useState("");

  // Fetch notes
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await getNotes();
        const notesWithDefaults = res.data.map((note: any) => ({
          _id: note._id,
          title: note.title || "Untitled",
          content: note.content || "",
          color: note.color || "bg-white",
          emoji: note.emoji || "📝",
          pinned: note.pinned ?? false,
          tags: note.tags || [],
          text: note.text || "",
        }));
        setNotes(notesWithDefaults);
      } catch (err) {
        console.error("Failed to fetch notes:", err);
      }
    };
    fetchNotes();
  }, []);

  // Add note
  const addNote = async (note: NewNote) => {
    try {
      const res = await createNote(note);

      const savedNote: Note = {
        ...res.data,
        color: note.color,
        emoji: note.emoji,
        pinned: note.pinned,
        tags: note.tags,
        text: note.text,
      };

      setNotes([savedNote, ...notes]);
      setShowNewNote(false);
    } catch (err) {
      console.error(err);
    }
  };

  // Delete note
  const deleteNoteHandler = async (id: string) => {
    try {
      await deleteNote(id);
      setNotes(notes.filter((n) => n._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete note");
    }
  };

  // Toggle pin
const togglePinHandler = async (note: Note) => {
  // Optimistic update
  setNotes(notes.map((n) =>
    n._id === note._id ? { ...n, pinned: !n.pinned } : n
  ));

  try {
    await updateNote(note._id, { pinned: !note.pinned });
  } catch (err) {
    console.error("Toggle pin error:", err);
    alert("Failed to toggle pin");
    // Revert if API fails
    setNotes(notes.map((n) =>
      n._id === note._id ? { ...n, pinned: note.pinned } : n
    ));
  }
};
  // Search filter
const filteredNotes = notes
  .filter(
    (n) =>
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.content.toLowerCase().includes(search.toLowerCase())
  )
  .sort((a, b) => (b.pinned === a.pinned ? 0 : b.pinned ? 1 : -1));

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      {/* Navbar */}
      <Navbar
        onLogout={() => console.log("Logout clicked")}
        isLoggedIn={false}
        username=""
        onLogin={() => {}}
      />

      {/* Header */}
      <div className="w-full max-w-5xl mx-auto mt-10 mb-6 px-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">

        {/* Title + count */}
        <div>
          <h1 className="text-4xl font-bold text-pink-600 flex items-center gap-3">
            <img src={NoteIcon} alt="note icon" className="w-8 h-8" />
            MyNotes
          </h1>

          <p className="text-gray-500 text-sm mt-1">
            {notes.length} {notes.length === 1 ? "note" : "notes"}
          </p>
        </div>

        {/* Search + New note */}
        <div className="flex items-center gap-3 w-full sm:w-auto">

          {/* Search */}
          <div className="relative w-full sm:w-64">
            <SearchIcon className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search notes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-400 shadow-sm"
            />
          </div>

          {/* New Note Button */}
  <button
  onClick={() => setShowNewNote(true)}
  className="px-3 py-1.5 bg-pink-500 text-white rounded-full shadow hover:bg-pink-600 transition text-sm flex items-center gap-1"
>
  + New
</button>
        </div>
      </div>

      {/* New note modal */}
      {showNewNote && (
        <NewNoteCard
          onSave={addNote}
          onCancel={() => setShowNewNote(false)}
        />
      )}

      {/* Notes */}
<div className="w-full max-w-5xl mx-auto px-4 mb-10">

  {/* Pinned Notes Section */}
  {notes.some(n => n.pinned) && (
    <>
      <h2 className="text-lg font-semibold text-pink-600 mb-2">Pinned</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.filter(n => n.pinned).map(note => (
          <NoteCard
            key={note._id}
            note={note}
            onDelete={deleteNoteHandler}
            onTogglePin={() => togglePinHandler(note)}
            onEdit={() => {}}
          />
        ))}
      </div>
    </>
  )}

  {/* All Notes Section with responsive spacing */}
  <div className="mt-6 sm:mt-10">
    <h2 className="text-lg font-semibold text-pink-600 mb-2">All Notes</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {notes.filter(n => !n.pinned).map(note => (
        <NoteCard
          key={note._id}
          note={note}
          onDelete={deleteNoteHandler}
          onTogglePin={() => togglePinHandler(note)}
          onEdit={() => {}}
        />
      ))}
    </div>
  </div>

</div>
    </div>
  );
};

export default App;