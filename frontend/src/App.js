import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import MediaGallery from './pages/MediaGallery';
import ImageUpload from './pages/ImageUpload';
import ImageDetail from './pages/ImageDetail';
import ZipDownloadPanel from './pages/zipDownloadPanel';
import UserProfile from './pages/userProfile';
import AdminUserManagement from './pages/AdminUserManagement';
import ContactPage from './pages/ContactPage';
import AdminContactMessages from './pages/AdminContactMessages';
//import NotFound from './pages/NotFound';

// Protected Route Component
function ProtectedRoute({ children, requireAdmin = false }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setIsAuthenticated(false);
        return;
      }
      try {
        // Assuming backend has an endpoint to verify token and return user data
        const res = await axios.get('http://localhost:5000/api/auth/verify', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setIsAuthenticated(true);
        setUserRole(res.data.role); // Assuming backend returns { userId, role }
      } catch (error) {
        setIsAuthenticated(false);
        localStorage.removeItem('token');
      }
    };
    verifyToken();
  }, []);

  if (isAuthenticated === null) return <div>Loading...</div>;

  if (!isAuthenticated) return <Navigate to="/login" />;
  if (requireAdmin && userRole !== 'admin') return <Navigate to="/unauthorized" />;

  return children;
}

function App() {
  return (
    <Router>
      <Routes>
       
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

       
        <Route
          path="/gallery"
          element={
            <ProtectedRoute>
              <MediaGallery />
            </ProtectedRoute>
          }
        />
        <Route
          path="/upload"
          element={
            <ProtectedRoute>
              <ImageUpload />
            </ProtectedRoute>
          }
        />

          <Route 
            path="/register" 
            element={
            <RegisterPage />
            }
           />

        <Route
          path="/image/:id"
          element={
            <ProtectedRoute>
              <ImageDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/zip-download"
          element={
            <ProtectedRoute>
              <zipDownloadPanel />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/contact"
          element={
            <ProtectedRoute>
              <ContactPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
  }
/>

        <Route
          path="/admin/users"
          element={
            <ProtectedRoute requireAdmin={true}>
              <AdminUserManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/contact"
          element={
            <ProtectedRoute requireAdmin={true}>
              <AdminContactMessages />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;