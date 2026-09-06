import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function UserProfile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <div className="container" style={{ maxWidth: 400 }}>
      <div className="card">
        <h2>Profile</h2>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <button className="btn btn-danger" onClick={handleLogout}>Log out</button>
      </div>
    </div>
  );
}

export default UserProfile;