export interface Note {
  id: number;
  title: string;
  content: string;
  pinned?: boolean;
  text: string;
  color?: string;      // background color
  emoji?: string;      // note emoji
  tags?: string[]; 
}