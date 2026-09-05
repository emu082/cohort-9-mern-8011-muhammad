import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function TopNav() {
  const { user, logout } = useAuth();
  return (
    <div className="top-nav">
      <Link to="/dashboard" className="brand">Notes App</Link>
      {user && (
        <div>
          <Link to="/profile" style={{ marginRight: 12 }}>{user.name}</Link>
          <button className="btn btn-secondary" onClick={logout}>Log out</button>
        </div>
      )}
    </div>
  );
}

export default TopNav;