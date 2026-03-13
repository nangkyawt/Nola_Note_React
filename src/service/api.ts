/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5001/api", // Make sure this matches the new PORT
});

export const getNotes = () => API.get("/notes");
export const createNote = (note: any) => API.post("/notes", note);
export const updateNote = (id: string, note: any) => API.put(`/notes/${id}`, note);
export const deleteNote = (id: string) => API.delete(`/notes/${id}`);

export default API;