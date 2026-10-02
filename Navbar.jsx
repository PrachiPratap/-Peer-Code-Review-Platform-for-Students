import { NavLink, useNavigate } from 'react-router-dom';
import { clearSession, getUser } from '../api.js';

export default function Navbar() {
  const navigate = useNavigate();
  const user = getUser();

  const logout = () => {
    clearSession();
    navigate('/login');
  };

  return (
    <header className="nav">
      <div className="nav-inner">
        <NavLink to="/dashboard" className="brand">Peer Review</NavLink>
        <nav className="nav-links" aria-label="Main">
          <NavLink to="/dashboard">Dashboard</NavLink>
          <NavLink to="/submissions">Review code</NavLink>
          <NavLink to="/submit">Submit code</NavLink>
          <NavLink to="/history">History</NavLink>
        </nav>
        <div className="nav-user">
          <span>{user?.name}</span>
          <button className="btn ghost" onClick={logout}>Log out</button>
        </div>
      </div>
    </header>
  );
}
