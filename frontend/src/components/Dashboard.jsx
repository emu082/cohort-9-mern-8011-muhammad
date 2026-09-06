import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchNotes, deleteNote } from "../api/notesApi";

function Dashboard() {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    load();
  }, [search]);

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