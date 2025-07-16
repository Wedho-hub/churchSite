/**
 * Login page component for admin authentication.
 * Provides secure login form with validation and error handling.
 * Redirects to admin dashboard upon successful authentication.
 */

import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

function Login() {
  // Authentication context and navigation
  const { login, token } = useAuth();
  const navigate = useNavigate();

  // Form state management
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  // UI state management
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (token) {
      navigate('/admin/dashboard');
    }
  }, [token, navigate]);

  /**
   * Handle form input changes
   * @param {Event} e - Input change event
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (error) setError('');
  };

  /**
   * Handle form submission
   * @param {Event} e - Form submit event
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.username.trim() || !formData.password.trim()) {
      setError('Please enter both username and password');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Attempt login
      const response = await axios.post('/api/admin/login', {
        username: formData.username.trim(),
        password: formData.password
      });

      // Extract token and admin data from response
      const { token: authToken, admin } = response.data;

      if (!authToken) {
        throw new Error('No authentication token received');
      }

      // Update authentication context
      login(authToken, admin);

      // Redirect to admin dashboard
      navigate('/admin/dashboard', { replace: true });

    } catch (error) {
      console.error('Login error:', error);
      
      // Handle different error types
      if (error.response) {
        const status = error.response.status;
        const message = error.response.data?.message || 'Login failed';
        
        switch (status) {
          case 401:
            setError('Invalid username or password');
            break;
          case 404:
            setError('Admin account not found');
            break;
          case 429:
            setError('Too many login attempts. Please try again later.');
            break;
          case 500:
            setError('Server error. Please try again later.');
            break;
          default:
            setError(message);
        }
      } else if (error.request) {
        setError('Unable to connect to server. Please check your connection.');
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  /**
   * Toggle password visibility
   */
  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  return (
    <Container className="min-vh-100 d-flex align-items-center justify-content-center py-5">
      <Row className="w-100 justify-content-center">
        <Col xs={12} sm={8} md={6} lg={4}>
          <Card className="shadow-lg border-0">
            <Card.Header className="bg-primary text-white text-center py-4">
              <h3 className="mb-0">
                <i className="fas fa-church me-2"></i>
                Admin Login
              </h3>
              <p className="mb-0 mt-2 opacity-75">Church Management System</p>
            </Card.Header>
            
            <Card.Body className="p-4">
              {/* Error Alert */}
              {error && (
                <Alert variant="danger" className="mb-4">
                  <i className="fas fa-exclamation-triangle me-2"></i>
                  {error}
                </Alert>
              )}

              {/* Login Form */}
              <Form onSubmit={handleSubmit}>
                {/* Username Field */}
                <Form.Group className="mb-3">
                  <Form.Label>
                    <i className="fas fa-user me-2"></i>
                    Username
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Enter your username"
                    disabled={loading}
                    autoComplete="username"
                    className="form-control-lg"
                  />
                </Form.Group>

                {/* Password Field */}
                <Form.Group className="mb-4">
                  <Form.Label>
                    <i className="fas fa-lock me-2"></i>
                    Password
                  </Form.Label>
                  <div className="position-relative">
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      disabled={loading}
                      autoComplete="current-password"
                      className="form-control-lg pe-5"
                    />
                    <Button
                      variant="link"
                      className="position-absolute end-0 top-50 translate-middle-y border-0 text-muted"
                      onClick={togglePasswordVisibility}
                      disabled={loading}
                      style={{ zIndex: 10 }}
                    >
                      <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                    </Button>
                  </div>
                </Form.Group>

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-100 mb-3"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        className="me-2"
                      />
                      Signing In...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-sign-in-alt me-2"></i>
                      Sign In
                    </>
                  )}
                </Button>
              </Form>

              {/* Additional Links */}
              <div className="text-center">
                <Link 
                  to="/" 
                  className="text-decoration-none text-muted"
                >
                  <i className="fas fa-arrow-left me-2"></i>
                  Back to Website
                </Link>
              </div>
            </Card.Body>

            {/* Footer */}
            <Card.Footer className="text-center text-muted py-3">
              <small>
                <i className="fas fa-shield-alt me-1"></i>
                Secure Admin Access
              </small>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
