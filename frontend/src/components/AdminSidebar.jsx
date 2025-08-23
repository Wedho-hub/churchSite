/**
 * Professional Admin sidebar navigation component.
 * Modern design with gradient background, user profile, and smooth animations.
 * Features responsive design and active link highlighting.
 */

import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const AdminSidebar = () => {
  const location = useLocation();
  const { admin } = useAuth();

  /**
   * Check if current path matches the given path
   * @param {string} path - Path to check
   * @returns {boolean} Whether the path is active
   */
  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  /**
   * Get user initials for avatar
   * @param {string} username - Username
   * @returns {string} User initials
   */
  const getUserInitials = (username) => {
    if (!username) return 'AD';
    return username.split(' ').map(name => name[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <div className="admin-sidebar">
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
          >
            <i className="fas fa-tachometer-alt admin-nav-icon"></i>
            <span>Dashboard</span>
          </Link>
        </div>

        {/* Content Management */}
        <div className="admin-nav-item">
          <Link 
            to="/admin/content" 
            className={`admin-nav-link ${isActive('/admin/content') ? 'active' : ''}`}
          >
            <i className="fas fa-edit admin-nav-icon"></i>
            <span>Manage Content</span>
          </Link>
        </div>

        {/* Blog Management */}
        <div className="admin-nav-item">
          <Link 
            to="/admin/blogs" 
            className={`admin-nav-link ${isActive('/admin/blogs') ? 'active' : ''}`}
          >
            <i className="fas fa-blog admin-nav-icon"></i>
            <span>Manage Blogs</span>
          </Link>
        </div>

        {/* Ministry Management */}
        <div className="admin-nav-item">
          <Link 
            to="/admin/ministries" 
            className={`admin-nav-link ${isActive('/admin/ministries') ? 'active' : ''}`}
          >
            <i className="fas fa-users admin-nav-icon"></i>
            <span>Manage Ministries</span>
          </Link>
        </div>

        {/* Messages */}
        <div className="admin-nav-item">
          <Link 
            to="/admin/messages" 
            className={`admin-nav-link ${isActive('/admin/messages') ? 'active' : ''}`}
          >
            <i className="fas fa-envelope admin-nav-icon"></i>
            <span>Contact Messages</span>
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
          >
            <i className="fas fa-external-link-alt admin-nav-icon"></i>
            <span>View Website</span>
          </Link>
        </div>

        {/* Gallery Management */}
        <div className="admin-nav-item">
          <a 
            href="/gallery" 
            className="admin-nav-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fas fa-images admin-nav-icon"></i>
            <span>Gallery</span>
          </a>
        </div>

        {/* System Section */}
        <div className="admin-nav-divider"></div>
        
        <div className="admin-nav-section">
          <div className="admin-nav-section-title">System</div>
        </div>

        {/* Settings */}
        <div className="admin-nav-item">
          <Link 
            to="/admin/settings" 
            className={`admin-nav-link ${isActive('/admin/settings') ? 'active' : ''}`}
          >
            <i className="fas fa-cog admin-nav-icon"></i>
            <span>Settings</span>
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
  );
};

export default AdminSidebar;
