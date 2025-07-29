import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/dashboard";
import MediaGallery from "./pages/MediaGallery";
import ImageUpload from "./pages/ImageUpload";
import ImageDetail from "./pages/ImageDetail";
import ZipDownload from "./pages/ZipDownload";
import Profile from "./pages/Profile";
import UserManagement from "./pages/UserManagement";
import ContactForm from "./pages/ContactForm";
import ContactMessages from "./pages/ContactMessages";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/gallery" element={<MediaGallery />} />
          <Route path="/upload" element={<ImageUpload />} />
          <Route path="/media/:id" element={<ImageDetail />} />
          <Route path="/zip-download" element={<ZipDownload />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin/users" element={<UserManagement />} />
          <Route path="/contact" element={<ContactForm />} />
          <Route path="/admin/messages" element={<ContactMessages />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

