import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

const AdminDashboard = () => {
  const { admin, token } = useAuth();
  const [stats, setStats] = useState({ blogs: 0, ministries: 0, messages: 0, contentSections: 0 });
  const [recentMessages, setRecentMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const [blogsRes, ministriesRes, messagesRes, contentRes] = await Promise.all([
          axios.get('/api/blogs'),
          axios.get('/api/ministries'),
          axios.get('/api/messages', { headers }),
          axios.get('/api/content'),
        ]);
        setStats({
          blogs: blogsRes.data.length,
          ministries: ministriesRes.data.length,
          messages: messagesRes.data.length,
          contentSections: contentRes.data.length,
        });
        setRecentMessages(messagesRes.data.slice(0, 5));
      } catch {
        setStats({ blogs: 0, ministries: 0, messages: 0, contentSections: 0 });
        setRecentMessages([]);
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
