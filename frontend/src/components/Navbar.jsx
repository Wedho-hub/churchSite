/**
 * Navigation bar component with responsive design and routing links.
 * Includes all main site sections, authentication, and admin access.
 * Features responsive collapse menu and professional styling.
 */

import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, NavDropdown, Button } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";

function AppNavbar() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  /**
   * Handle admin logout
   */
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Navbar bg="white" expand="lg" className="shadow-sm border-bottom">
      <Container>
        {/* Brand/Logo */}
        <Navbar.Brand as={Link} to="/" className="fw-bold text-primary d-flex align-items-center">
          <i className="fas fa-church me-2"></i>
          Inkosiyeza SDA
        </Navbar.Brand>
        
        {/* Mobile toggle button */}
        <Navbar.Toggle aria-controls="main-navbar" />
        
        {/* Navigation links and admin section in flex row */}
        <div className="d-flex w-100 align-items-center">
          <Navbar.Collapse id="main-navbar">
            <Nav className="ms-auto align-items-center">
              {/* Main navigation links */}
              <Nav.Link as={Link} to="/" className="fw-medium">
                <i className="fas fa-home me-1"></i>
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/about" className="fw-medium">
                <i className="fas fa-info-circle me-1"></i>
                About
              </Nav.Link>
              <Nav.Link as={Link} to="/ministries" className="fw-medium">
                <i className="fas fa-users me-1"></i>
                Ministries
              </Nav.Link>
              <Nav.Link as={Link} to="/blogs" className="fw-medium">
                <i className="fas fa-blog me-1"></i>
                Blog
              </Nav.Link>
              {/* Resources dropdown */}
              <NavDropdown 
                title={
                  <span>
                    <i className="fas fa-folder me-1"></i>
                    Resources
                  </span>
                } 
                id="resources-dropdown"
                className="fw-medium"
              >
                <NavDropdown.Item as={Link} to="/bulletins">
                  <i className="fas fa-bullhorn me-2"></i>
                  Bulletins
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/resources">
                  <i className="fas fa-download me-2"></i>
                  Downloads
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/gallery">
                  <i className="fas fa-images me-2"></i>
                  Gallery
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link as={Link} to="/contact" className="fw-medium">
                <i className="fas fa-envelope me-1"></i>
                Contact
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
          {/* Admin section and divider OUTSIDE collapse, but in flex row */}
          <div className="vr mx-2 d-none d-lg-block"></div>
          {token ? (
            <div className="position-relative d-inline-block">
              <NavDropdown
                title={
                  <span className="text-success">
                    <i className="fas fa-user-shield me-1"></i>
                    Admin
                  </span>
                }
                id="admin-dropdown"
                className="fw-medium admin-dropdown-fix"
                menuVariant="light"
                style={{ zIndex: 1050 }}
                popperConfig={{
                  strategy: 'fixed',
                  modifiers: [
                    { name: 'preventOverflow', options: { boundary: 'viewport' } },
                    { name: 'flip', options: { fallbackPlacements: ['bottom', 'top'] } }
                  ]
                }}
              >
                <NavDropdown.Item as={Link} to="/admin/dashboard">
                  <i className="fas fa-tachometer-alt me-2"></i>
                  Dashboard
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/admin/content">
                  <i className="fas fa-edit me-2"></i>
                  Manage Content
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/admin/blogs">
                  <i className="fas fa-blog me-2"></i>
                  Manage Blogs
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/admin/ministries">
                  <i className="fas fa-users me-2"></i>
                  Manage Ministries
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/admin/messages">
                  <i className="fas fa-envelope me-2"></i>
                  Messages
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout} className="text-danger">
                  <i className="fas fa-sign-out-alt me-2"></i>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </div>
          ) : (
            <Button
              as={Link}
              to="/login"
              variant="outline-primary"
              size="sm"
              className="ms-2"
            >
              <i className="fas fa-sign-in-alt me-1"></i>
              Admin Login
            </Button>
          )}
        </div>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
