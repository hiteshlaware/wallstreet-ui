import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function ProtectedRoute() {
  const { isAuthenticated } = useAuth();

  // If not authenticated, redirect to login
  // Otherwise, render the protected component
  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoute;
