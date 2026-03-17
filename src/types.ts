export interface Note {
  _id: string;
  title: string;
  content: string;
  color: string;
  emoji: string;
  pinned: boolean;
  tags: string[];
  text: string;
  createdAt: string; // string from backend, can convert to Date in UI
  updatedAt?: string; // optional updated date
}

export interface NewNote {
  title: string;
  content: string;
  color: string;
  emoji: string;
  pinned: boolean;
  tags: string[];
  text: string;
}