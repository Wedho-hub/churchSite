/**
 * Professional Admin sidebar navigation component.
 * Modern design with gradient background, user profile, and smooth animations.
 * Features responsive design and active link highlighting.
 */

import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const AdminSidebar = () => {
  const location = useLocation();
  const { admin } = useAuth();
  const [open, setOpen] = useState(false);

  // Toggle sidebar for mobile
  const toggleSidebar = () => setOpen((v) => !v);

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const getUserInitials = (username) => {
    if (!username) return 'AD';
    return username.split(' ').map(name => name[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <>
      {/* Sidebar Toggle Button for mobile */}
      <button
        className="btn btn-primary d-lg-none position-fixed"
        style={{ top: 20, left: 20, zIndex: 2001, borderRadius: '50%', width: 44, height: 44 }}
        aria-label="Toggle admin sidebar"
        onClick={toggleSidebar}
      >
        <i className="fas fa-bars"></i>
      </button>
      {/* Overlay for mobile sidebar */}
      {open && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100"
          style={{ background: 'rgba(0,0,0,0.3)', zIndex: 2000 }}
          onClick={toggleSidebar}
        />
      )}
      <div className={`admin-sidebar${open ? ' show' : ''}`}
        style={open ? { transform: 'translateX(0)' } : {}}
      >
        {/* Admin Header with User Profile */}
        <div className="admin-sidebar-header">
          <div className="admin-user-info">
            <div className="admin-user-avatar">
              {getUserInitials(admin?.username)}
            </div>
            <div>
              <h5 className="mb-0 text-white">Admin Panel</h5>
              <small className="text-white-50">
                {admin?.username || 'Administrator'}
              </small>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <nav className="admin-nav">
          <div className="admin-nav-section">
            <div className="admin-nav-section-title">Main Menu</div>
          </div>

          {/* Dashboard */}
          <div className="admin-nav-item">
            <Link 
              to="/admin/dashboard" 
              className={`admin-nav-link ${
                isActive('/admin/dashboard') || location.pathname === '/admin' ? 'active' : ''
              }`}
              onClick={() => setOpen(false)}
              title="Dashboard"
            >
              <div className="admin-nav-icon-circle"><i className="fas fa-tachometer-alt" /></div>
              <span className="admin-nav-label">Dashboard</span>
            </Link>
          </div>

          {/* Content Management */}
          <div className="admin-nav-item">
            <Link 
              to="/admin/content" 
              className={`admin-nav-link ${isActive('/admin/content') ? 'active' : ''}`}
              onClick={() => setOpen(false)}
              title="Manage content"
            >
              <div className="admin-nav-icon-circle"><i className="fas fa-edit" /></div>
              <span className="admin-nav-label">Manage Content</span>
            </Link>
          </div>

          {/* Blog Management */}
        <div className="admin-nav-item">
          <Link 
            to="/admin/blogs" 
            className={`admin-nav-link ${isActive('/admin/blogs') ? 'active' : ''}`}
            onClick={() => setOpen(false)}
            title="Manage blogs"
          >
            <div className="admin-nav-icon-circle"><i className="fas fa-blog" /></div>
            <span className="admin-nav-label">Manage Blogs</span>
          </Link>
        </div>

        {/* Ministry Management */}
        <div className="admin-nav-item">
          <Link 
            to="/admin/ministries" 
            className={`admin-nav-link ${isActive('/admin/ministries') ? 'active' : ''}`}
            onClick={() => setOpen(false)}
            title="Manage ministries"
          >
            <div className="admin-nav-icon-circle"><i className="fas fa-users" /></div>
            <span className="admin-nav-label">Manage Ministries</span>
          </Link>
        </div>

        {/* Messages */}
        <div className="admin-nav-item">
          <Link 
            to="/admin/messages" 
            className={`admin-nav-link ${isActive('/admin/messages') ? 'active' : ''}`}
            onClick={() => setOpen(false)}
            title="Contact messages"
          >
            <div className="admin-nav-icon-circle"><i className="fas fa-envelope" /></div>
            <span className="admin-nav-label">Contact Messages</span>
          </Link>
        </div>

        {/* Divider */}
        <div className="admin-nav-divider"></div>

        {/* Quick Actions Section */}
        <div className="admin-nav-section">
          <div className="admin-nav-section-title">Quick Actions</div>
        </div>

        {/* View Website */}
        <div className="admin-nav-item">
          <Link 
            to="/" 
            className="admin-nav-link"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
          >
            <div className="admin-nav-icon-circle"><i className="fas fa-external-link-alt" /></div>
            <span className="admin-nav-label">View Website</span>
          </Link>
        </div>

        {/* Gallery Management */}
        <div className="admin-nav-item">
          <a 
            href="/gallery" 
            className="admin-nav-link"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
          >
            <div className="admin-nav-icon-circle"><i className="fas fa-images" /></div>
            <span className="admin-nav-label">Gallery</span>
          </a>
        </div>

        {/* Settings */}
        <div className="admin-nav-item">
          <Link 
            to="/admin/settings" 
            className={`admin-nav-link ${isActive('/admin/settings') ? 'active' : ''}`}
            onClick={() => setOpen(false)}
            title="Settings"
          >
            <div className="admin-nav-icon-circle"><i className="fas fa-cog" /></div>
            <span className="admin-nav-label">Settings</span>
          </Link>
        </div>
      </nav>

      {/* Footer Info */}
      <div className="mt-auto p-3" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
        <div className="d-flex align-items-center justify-content-center">
          <div className="text-center">
            <i className="fas fa-shield-alt text-white-50 mb-2 d-block"></i>
            <small className="text-white-50 d-block">Admin Dashboard</small>
            <small className="text-white-50">v2.0</small>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default AdminSidebar;
