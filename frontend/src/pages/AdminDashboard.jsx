import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import '../assets/styles.css';

// Placeholder data for when APIs are not available
const placeholderData = {
  blogs: [
    { _id: '1', title: 'Welcome to Our Church', content: 'We are excited to welcome you...', image: '/placeholder/blog1.jpg', createdAt: '2024-01-15' },
    { _id: '2', title: 'Sabbath Service Highlights', content: 'This week we focused on...', image: '/placeholder/blog2.jpg', createdAt: '2024-01-08' },
    { _id: '3', title: 'Community Outreach Program', content: 'Our church is reaching out...', image: '/placeholder/blog3.jpg', createdAt: '2024-01-01' }
  ],
  ministries: [
    { _id: '1', name: 'Youth Ministry', leader: 'Pastor John Smith', description: 'Empowering young people...', functions: ['Weekly meetings', 'Bible study', 'Community service'] },
    { _id: '2', name: 'Women\'s Ministry', leader: 'Sister Mary Johnson', description: 'Supporting women...', functions: ['Prayer meetings', 'Bible study', 'Fellowship'] },
    { _id: '3', name: 'Men\'s Fellowship', leader: 'Elder David Brown', description: 'Building strong men...', functions: ['Monthly breakfasts', 'Retreats', 'Service projects'] }
  ],
  messages: [
    { _id: '1', name: 'Sarah Wilson', email: 'sarah@email.com', message: 'I would like to learn more about your church programs.', read: false, createdAt: '2024-01-20' },
    { _id: '2', name: 'Michael Davis', email: 'michael@email.com', message: 'Can I schedule a visit to your church this Sunday?', read: true, createdAt: '2024-01-19' }
  ],
  contentSections: [
    { section: 'about', title: 'About Our Church', body: 'We are a vibrant community...' },
    { section: 'mission', title: 'Our Mission', body: 'To spread the love of Christ...' },
    { section: 'vision', title: 'Our Vision', body: 'To be a light in our community...' }
  ]
};

const AdminDashboard = () => {
  const { admin, token } = useAuth();
  const [stats, setStats] = useState({
    blogs: 0,
    ministries: 0,
    messages: 0,
    contentSections: 0,
  });
  const [recentMessages, setRecentMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [usePlaceholder, setUsePlaceholder] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        
        const [blogsRes, ministriesRes, messagesRes, contentRes] = await Promise.all([
          axios.get('/api/blogs').catch(() => ({ data: placeholderData.blogs })),
          axios.get('/api/ministries').catch(() => ({ data: placeholderData.ministries })),
          axios.get('/api/messages', { headers }).catch(() => ({ data: placeholderData.messages })),
          axios.get('/api/content').catch(() => ({ data: placeholderData.contentSections })),
        ]);

        setStats({
          blogs: blogsRes.data.length,
          ministries: ministriesRes.data.length,
          messages: messagesRes.data.length,
          contentSections: contentRes.data.length,
        });
        setRecentMessages(messagesRes.data.slice(0, 5));
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        // Fallback to placeholder data
        setStats({
          blogs: placeholderData.blogs.length,
          ministries: placeholderData.ministries.length,
          messages: placeholderData.messages.length,
          contentSections: placeholderData.contentSections.length,
        });
        setRecentMessages(placeholderData.messages.slice(0, 5));
        setUsePlaceholder(true);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [token]);

  return (
    <div className="admin-main p-4">
      <header className="admin-header mb-4">
        <h1 className="admin-page-title">Welcome, {admin?.username || 'Admin'}</h1>
        <p className="admin-page-subtitle">Here's what's happening in your church today</p>
        {usePlaceholder && (
          <div className="alert alert-info">
            <i className="fas fa-info-circle"></i> Displaying placeholder data. Connect to backend for live data.
          </div>
        )}
      </header>

      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading dashboard...</p>
        </div>
      ) : (
        <>
          <section className="dashboard-stats mb-4">
            <div className="stat-card">
              <div className="stat-card-header">
                <div className="stat-card-icon primary">
                  <i className="fas fa-blog"></i>
                </div>
                <h3 className="stat-card-value">{stats.blogs}</h3>
              </div>
              <p className="stat-card-label">Blogs</p>
            </div>

            <div className="stat-card">
              <div className="stat-card-header">
                <div className="stat-card-icon info">
                  <i className="fas fa-users"></i>
                </div>
                <h3 className="stat-card-value">{stats.ministries}</h3>
              </div>
              <p className="stat-card-label">Ministries</p>
            </div>

            <div className="stat-card">
              <div className="stat-card-header">
                <div className="stat-card-icon warning">
                  <i className="fas fa-envelope"></i>
                </div>
                <h3 className="stat-card-value">{stats.messages}</h3>
              </div>
              <p className="stat-card-label">Messages</p>
            </div>

            <div className="stat-card">
              <div className="stat-card-header">
                <div className="stat-card-icon success">
                  <i className="fas fa-file-alt"></i>
                </div>
                <h3 className="stat-card-value">{stats.contentSections}</h3>
              </div>
              <p className="stat-card-label">Content Sections</p>
            </div>
          </section>

          <section className="dashboard-grid mb-4">
            <div className="dashboard-card">
              <div className="dashboard-card-header">
                <h2 className="dashboard-card-title">Recent Messages</h2>
              </div>
              <div className="dashboard-card-body">
                {recentMessages.length === 0 ? (
                  <p>No recent messages.</p>
                ) : (
                  <ul className="list-group">
                    {recentMessages.map((msg) => (
                      <li key={msg._id} className="list-group-item d-flex justify-content-between align-items-center">
                        <div>
                          <strong>{msg.name}</strong> ({msg.email})
                          <p className="mb-0">{msg.message.length > 50 ? msg.message.substring(0, 50) + '...' : msg.message}</p>
                        </div>
                        <span className={`status-badge ${msg.read ? 'success' : 'warning'}`}>
                          {msg.read ? 'Read' : 'Unread'}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            <div className="dashboard-card">
              <div className="dashboard-card-header">
                <h2 className="dashboard-card-title">Quick Actions</h2>
              </div>
              <div className="dashboard-card-body">
                <div className="quick-actions">
                  <a href="/admin/blogs" className="quick-action-btn">
                    <div className="quick-action-icon">
                      <i className="fas fa-blog"></i>
                    </div>
                    Manage Blogs
                  </a>
                  <a href="/admin/content" className="quick-action-btn">
                    <div className="quick-action-icon">
                      <i className="fas fa-edit"></i>
                    </div>
                    Manage Content
                  </a>
                  <a href="/admin/ministries" className="quick-action-btn">
                    <div className="quick-action-icon">
                      <i className="fas fa-users"></i>
                    </div>
                    Manage Ministries
                  </a>
                  <a href="/admin/messages" className="quick-action-btn">
                    <div className="quick-action-icon">
                      <i className="fas fa-envelope"></i>
                    </div>
                    Contact Messages
                  </a>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
