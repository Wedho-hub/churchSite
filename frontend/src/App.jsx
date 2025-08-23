/**
 * Main App component that sets up routing and layout structure.
 * Includes smooth scrolling functionality for anchor links and comprehensive routing.
 * Handles both public and admin routes with proper authentication protection.
 */

import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppNavbar from "./components/Navbar";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Ministries from "./pages/Ministries";
import Bulletins from "./pages/Bulletins";
import Resources from "./pages/Resources";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import BlogPublicList from "./pages/BlogPublicList";
import BlogDetail from "./pages/BlogDetail";
import Login from "./pages/Login";
import Footer from './components/Footer';

// Admin imports
import AdminDashboard from "./pages/AdminDashboard";
import ManageBlogs from "./pages/ManageBlogs";
import ManageContent from "./pages/ManageContent";
import ManageMinistries from "./pages/ManageMinistries";
import ContactMessages from "./pages/ContactMessages";
import AdminLayout from "./layouts/AdminLayout";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
  // 🧠 Smooth scroll effect for anchor links
  useEffect(() => {
    const anchors = document.querySelectorAll('a[href^="#"]');
    const handleClick = (e) => {
      e.preventDefault();
      const href = e.currentTarget.getAttribute("href");
      // Skip empty or just "#" hrefs
      if (!href || href === "#" || href.length <= 1) return;
      
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    };

    anchors.forEach(anchor => anchor.addEventListener("click", handleClick));

    return () => {
      anchors.forEach(anchor => anchor.removeEventListener("click", handleClick));
    };
  }, []);

  return (
    <BrowserRouter>
      <div className="d-flex flex-column min-vh-100">
        <AppNavbar />
        <main className="flex-grow-1">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blogs" element={<BlogPublicList />} />
            <Route path="/blogs/:slug" element={<BlogDetail />} />
            <Route path="/ministries" element={<Ministries />} />
            <Route path="/bulletins" element={<Bulletins />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/gallery" element={<Gallery />} />
            
            {/* Authentication Route */}
            <Route path="/login" element={<Login />} />

            {/* Admin Routes - Protected */}
            <Route
              path="/admin"
              element={
                <PrivateRoute>
                  <AdminLayout />
                </PrivateRoute>
              }
            >
              <Route index element={<AdminDashboard />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="blogs" element={<ManageBlogs />} />
              <Route path="content" element={<ManageContent />} />
              <Route path="ministries" element={<ManageMinistries />} />
              <Route path="messages" element={<ContactMessages />} />
            </Route>

            {/* Catch-all route for 404 */}
            <Route path="*" element={
              <div className="container text-center py-5">
                <h1 className="display-1 text-muted">404</h1>
                <h2>Page Not Found</h2>
                <p className="lead">The page you're looking for doesn't exist.</p>
                <a href="/" className="btn btn-primary">
                  <i className="fas fa-home me-2"></i>
                  Go Home
                </a>
              </div>
            } />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
