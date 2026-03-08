import React from "react";
import type { Note } from "../types";
import { TrashIcon, PencilIcon } from '@heroicons/react/outline';


interface NoteCardProps {
  note: Note;
  onDelete: (id: number) => void;
  onTogglePin: (id: number) => void; 
  onEdit: (note: Note) => void;
 
}


const NoteCard: React.FC<NoteCardProps> = ({ note, onDelete, onTogglePin, onEdit }) => {
  return (
    <div
      className={`relative p-4 rounded-xl shadow-md flex flex-col transition hover:shadow-xl ${
        note.color || "bg-white"
      }`}
    >
      {/* Pinned badge */}
      {note.pinned && (
        <span className="absolute top-2 right-2 text-yellow-500 text-lg">📌</span>
      )}

      {/* Title + Emoji */}
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-bold text-lg flex items-center gap-2">
          {note.emoji || "📝"} {note.title || "Untitled"}
        </h3>
        <div className="flex gap-2">
          {/* Edit icon */}
          <button onClick={() => onEdit(note)} className="text-gray-600 hover:text-gray-800">
            <PencilIcon className="w-5 h-5" />
          </button>
          {/* Delete icon */}
          <button onClick={() => onDelete(note.id)} className="text-red-500 hover:text-red-700">
            <TrashIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Content */}
      <p className="text-gray-700 mb-2">{note.content}</p>

      {/* Tags */}
      {note.tags && note.tags.length > 0 && (
        <div className="flex gap-2 flex-wrap">
          {note.tags.map((tag) => (
            <span key={tag} className="text-xs bg-pink-200 px-2 py-1 rounded">
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Pin toggle */}
      <button
        onClick={() => onTogglePin(note.id)}
        className="mt-2 text-pink-500 hover:text-pink-700 font-semibold self-start"
      >
        {note.pinned ? "Unpin" : "Pin"}
      </button>
    </div>
  );
};



export default NoteCard;