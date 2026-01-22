import { Routes, Route, Navigate } from 'react-router-dom';
import AdminUI from './pages/admin/dashboard';
import DomainsPage from './pages/admin/domains';
import UserDashboard from './pages/user/dashboard';
import ProfilePage from './pages/profile/Profile';
import Login from './pages/auth/Login';
import Home from './pages/home/Home';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />

      {/* Protected Admin Routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminUI />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/domains"
        element={
          <ProtectedRoute requiredRole="admin">
            <DomainsPage />
          </ProtectedRoute>
        }
      />

      {/* Protected User Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute requiredRole="user">
            <UserDashboard />
          </ProtectedRoute>
        }
      />

      {/* Protected Profile Route (both admin and user) */}
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />

      {/* Catch all - redirect to login */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

