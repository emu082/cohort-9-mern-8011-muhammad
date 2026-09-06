import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { fetchNote, createNote, updateNote } from "../api/notesApi";

function NoteEditor() {
  const { id } = useParams();
  const isNew = id === "new";
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(!isNew);

  useEffect(() => {
    if (isNew) return;
    fetchNote(id).then((note) => {
      setTitle(note.title);
      setContent(note.content);
      setLoading(false);
    });
  }, [id]);

  async function handleSave() {
    if (isNew) {
      await createNote({ title, content });
    } else {
      await updateNote(id, { title, content });
    }
    navigate("/dashboard");
  }

  if (loading) return <div className="container">Loading...</div>;

  return (
    <div className="container">
      <div className="card">
        <h2>{isNew ? "New Note" : "Edit Note"}</h2>
        <div className="form-group">
          <label>Title</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Content</label>
          <ReactQuill theme="snow" value={content} onChange={setContent} />
        </div>
        <button className="btn btn-primary" onClick={handleSave}>Save</button>
        <button className="btn btn-secondary" onClick={() => navigate("/dashboard")} style={{ marginLeft: 8 }}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default NoteEditor;