// export interface Note {
//   [x: string]: string;
//   _id: number;
//   title: string;
//   content: string;
//   pinned?: boolean;
//   text: string;
//   color?: string;      // background color
//   emoji?: string;      // note emoji
//   tags?: string[]; 
// }
export interface Note {
  _id: string;
  title: string;
  content: string;
  color: string;
  emoji: string;
  pinned: boolean;
  tags: string[];
  text: string;
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