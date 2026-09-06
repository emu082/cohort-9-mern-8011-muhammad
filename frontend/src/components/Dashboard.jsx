import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { fetchNotes, deleteNote, exportNotes, importNotes } from "../api/notesApi";

function Dashboard() {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    load();
  }, [search]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const socket = io(import.meta.env.VITE_SOCKET_URL, { auth: { token } });

    socket.on("note:created", (note) => {
      setNotes((prev) => [note, ...prev]);
    });
    socket.on("note:updated", (note) => {
      setNotes((prev) => prev.map((n) => (n.id === note.id ? note : n)));
    });
    socket.on("note:deleted", ({ id }) => {
      setNotes((prev) => prev.filter((n) => n.id !== id));
    });

    return () => socket.disconnect();
  }, []);

  async function load() {
    setLoading(true);
    const data = await fetchNotes(search);
    setNotes(data);
    setLoading(false);
  }

  async function handleDelete(id, e) {
    e.stopPropagation();
    if (!window.confirm("Delete this note?")) return;
    await deleteNote(id);
    setNotes(notes.filter((n) => n.id !== id));
  }

  async function handleExport() {
    const res = await exportNotes();
    const blob = new Blob([JSON.stringify(res.data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "notes-export.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  async function handleImportFile(e) {
    const file = e.target.files[0];
    if (!file) return;
    const text = await file.text();
    const parsed = JSON.parse(text);
    await importNotes(parsed);
    load();
    e.target.value = "";
  }

  return (
    <div className="container">
      <div className="toolbar">
        <input
          type="text"
          placeholder="Search notes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="btn btn-primary" onClick={() => navigate("/notes/new")}>+ New Note</button>
        <button className="btn btn-secondary" onClick={handleExport}>Export</button>
        <label className="btn btn-secondary" style={{ marginBottom: 0 }}>
          Import
          <input type="file" accept="application/json" onChange={handleImportFile} hidden />
        </label>
      </div>

      {loading && <p>Loading...</p>}
      {!loading && notes.length === 0 && <p>No notes yet.</p>}

      <div className="note-grid">
        {notes.map((note) => (
          <div key={note.id} className="card note-card" onClick={() => navigate(`/notes/${note.id}`)}>
            <h3>{note.title}</h3>
            <div className="note-preview">{note.content.replace(/<[^>]*>/g, "").slice(0, 100)}</div>
            <button className="btn btn-danger" onClick={(e) => handleDelete(note.id, e)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;