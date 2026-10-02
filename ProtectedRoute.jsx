import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { getToken } from '../api.js';
import Navbar from './Navbar.jsx';

export default function ProtectedRoute() {
  const location = useLocation();
  if (!getToken()) return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  return (
    <>
      <Navbar />
      <main className="page">
        <Outlet />
      </main>
    </>
  );
}
