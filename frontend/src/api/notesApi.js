import axiosClient from "./axiosClient";

export const fetchNotes = (search = "") =>
  axiosClient.get("/notes", { params: search ? { search } : {} }).then((r) => r.data.notes);

export const fetchNote = (id) => axiosClient.get(`/notes/${id}`).then((r) => r.data.note);

export const createNote = (data) => axiosClient.post("/notes", data).then((r) => r.data.note);

export const updateNote = (id, data) => axiosClient.put(`/notes/${id}`, data).then((r) => r.data.note);

export const deleteNote = (id) => axiosClient.delete(`/notes/${id}`);

export const exportNotes = () => axiosClient.get("/notes/export");

export const importNotes = (notes) => axiosClient.post("/notes/import", { notes });