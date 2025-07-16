/**
 * Admin sidebar navigation component.
 * Provides navigation links for all admin management sections.
 * Features responsive design and active link highlighting.
 */

import { Link, useLocation } from 'react-router-dom';
import { Nav, Card } from 'react-bootstrap';
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

  return (
    <div className="bg-primary text-white" style={{ minHeight: '100vh', width: '280px' }}>
      {/* Admin Header */}
      <div className="p-4 border-bottom border-light border-opacity-25">
        <div className="d-flex align-items-center mb-3">
          <i className="fas fa-user-shield fs-3 me-3"></i>
          <div>
            <h5 className="mb-0">Admin Panel</h5>
            <small className="opacity-75">
              {admin?.username || 'Administrator'}
            </small>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <Nav className="flex-column p-3">
        {/* Dashboard */}
        <Nav.Item className="mb-2">
          <Nav.Link 
            as={Link} 
            to="/admin/dashboard" 
            className={`text-white text-decoration-none d-flex align-items-center p-3 rounded ${
              isActive('/admin/dashboard') || location.pathname === '/admin' 
                ? 'bg-white bg-opacity-25' 
                : 'hover-bg-light'
            }`}
          >
            <i className="fas fa-tachometer-alt me-3"></i>
            <span>Dashboard</span>
          </Nav.Link>
        </Nav.Item>

        {/* Content Management */}
        <Nav.Item className="mb-2">
          <Nav.Link 
            as={Link} 
            to="/admin/content" 
            className={`text-white text-decoration-none d-flex align-items-center p-3 rounded ${
              isActive('/admin/content') ? 'bg-white bg-opacity-25' : 'hover-bg-light'
            }`}
          >
            <i className="fas fa-edit me-3"></i>
            <span>Manage Content</span>
          </Nav.Link>
        </Nav.Item>

        {/* Blog Management */}
        <Nav.Item className="mb-2">
          <Nav.Link 
            as={Link} 
            to="/admin/blogs" 
            className={`text-white text-decoration-none d-flex align-items-center p-3 rounded ${
              isActive('/admin/blogs') ? 'bg-white bg-opacity-25' : 'hover-bg-light'
            }`}
          >
            <i className="fas fa-blog me-3"></i>
            <span>Manage Blogs</span>
          </Nav.Link>
        </Nav.Item>

        {/* Ministry Management */}
        <Nav.Item className="mb-2">
          <Nav.Link 
            as={Link} 
            to="/admin/ministries" 
            className={`text-white text-decoration-none d-flex align-items-center p-3 rounded ${
              isActive('/admin/ministries') ? 'bg-white bg-opacity-25' : 'hover-bg-light'
            }`}
          >
            <i className="fas fa-users me-3"></i>
            <span>Manage Ministries</span>
          </Nav.Link>
        </Nav.Item>

        {/* Messages */}
        <Nav.Item className="mb-2">
          <Nav.Link 
            as={Link} 
            to="/admin/messages" 
            className={`text-white text-decoration-none d-flex align-items-center p-3 rounded ${
              isActive('/admin/messages') ? 'bg-white bg-opacity-25' : 'hover-bg-light'
            }`}
          >
            <i className="fas fa-envelope me-3"></i>
            <span>Contact Messages</span>
          </Nav.Link>
        </Nav.Item>

        {/* Divider */}
        <hr className="border-light border-opacity-25 my-3" />

        {/* Quick Actions */}
        <div className="mb-3">
          <small className="text-white-50 text-uppercase fw-bold px-3">Quick Actions</small>
        </div>

        {/* View Website */}
        <Nav.Item className="mb-2">
          <Nav.Link 
            as={Link} 
            to="/" 
            className="text-white text-decoration-none d-flex align-items-center p-3 rounded hover-bg-light"
            target="_blank"
          >
            <i className="fas fa-external-link-alt me-3"></i>
            <span>View Website</span>
          </Nav.Link>
        </Nav.Item>

        {/* Gallery Management */}
        <Nav.Item className="mb-2">
          <Nav.Link 
            href="/gallery" 
            className="text-white text-decoration-none d-flex align-items-center p-3 rounded hover-bg-light"
            target="_blank"
          >
            <i className="fas fa-images me-3"></i>
            <span>Gallery</span>
          </Nav.Link>
        </Nav.Item>
      </Nav>

      {/* Footer */}
      <div className="mt-auto p-3 border-top border-light border-opacity-25">
        <Card className="bg-white bg-opacity-10 border-0">
          <Card.Body className="p-3">
            <div className="d-flex align-items-center">
              <i className="fas fa-info-circle text-white me-2"></i>
              <small className="text-white">
                Admin Dashboard v1.0
              </small>
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default AdminSidebar;
