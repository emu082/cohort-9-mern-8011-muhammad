import { Routes, Route, Navigate } from "react-router-dom";
import TopNav from "./components/TopNav";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import NoteEditor from "./components/NoteEditor";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <>
      <TopNav />
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/notes/:id" element={<PrivateRoute><NoteEditor /></PrivateRoute>} />
      </Routes>
    </>
  );
}

export default App;