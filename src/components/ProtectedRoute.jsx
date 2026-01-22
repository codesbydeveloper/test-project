import { Navigate } from 'react-router-dom';
import { getCookie } from '../utils/cookies';

export default function ProtectedRoute({ children, requiredRole = null }) {
  const token = getCookie('token');
  const authStatus = localStorage.getItem('isAuthenticated');
  const userRole = localStorage.getItem('userRole');

  if (!token || authStatus !== 'true') {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && userRole !== requiredRole) {
    // Redirect to appropriate dashboard based on role
    return <Navigate to={userRole === 'admin' ? '/admin' : '/dashboard'} replace />;
  }

  return children;
}

