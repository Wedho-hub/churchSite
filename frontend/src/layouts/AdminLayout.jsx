import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";

/**
 * AdminLayout - wraps all admin pages with sidebar and main content.
 * Adds a responsive sidebar toggle for mobile.
 */
const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Toggle sidebar for mobile
  const handleSidebarToggle = () => setSidebarOpen((open) => !open);

  return (
    <div className="admin-layout d-flex" style={{ minHeight: '100vh', background: 'var(--admin-bg)' }}>
      {/* Sidebar (fixed for desktop, overlay for mobile) */}
      <div
        className={`admin-sidebar${sidebarOpen ? ' show' : ''}`}
        style={{ zIndex: 1200 }}
      >
        <AdminSidebar />
      </div>

      {/* Main content */}
      <div className="admin-content flex-grow-1" style={{ marginLeft: 280, minHeight: '100vh', background: 'var(--admin-bg)' }}>
        {/* Mobile sidebar toggle button */}
        <button
          className="btn btn-outline-secondary d-lg-none mb-3"
          style={{ position: 'fixed', top: 20, left: 20, zIndex: 1300 }}
          onClick={handleSidebarToggle}
          aria-label="Toggle admin sidebar"
        >
          <i className="fas fa-bars"></i>
        </button>
        <div style={{ padding: '2rem 1rem 1rem 1rem', maxWidth: 1200, margin: '0 auto' }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
