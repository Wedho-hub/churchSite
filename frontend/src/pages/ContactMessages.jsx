import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import HeaderIcon from '../components/HeaderIcon';

function ContactMessages() {
  const { token } = useAuth();
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        if (!token) {
          setError('🔒 Please sign in to view messages');
          setMessages([]);
          return;
        }
        const res = await axios.get('/api/messages', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessages(res.data || []);
      } catch (err) {
        setError('❌ Failed to fetch messages');
        // capture more details in console for debugging
        console.error('ContactMessages fetch error:', err?.response || err.message || err);
      }
    };
    fetchMessages();
  }, [token]);

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-8">
          <div className="card shadow-sm">
            <div className="card-body">
              <HeaderIcon icon="fa-envelope" title="Contact Messages" subtitle="View messages sent via the contact form" />

              {error && <div className="alert alert-danger">{error}</div>}

              <div className="table-responsive mt-3">
                <table className="table table-hover align-middle message-table">
                  <thead className="table-light small text-uppercase">
                    <tr>
                      <th className="w-25">Name</th>
                      <th className="w-25">Email</th>
                      <th>Message</th>
                      <th className="text-nowrap">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {messages.length === 0 ? (
                      <tr>
                        <td colSpan="4" className="text-center py-4 text-muted">No messages found.</td>
                      </tr>
                    ) : (
                      messages.map((msg) => (
                        <tr key={msg._id}>
                          <td className="fw-semibold">{msg.name}</td>
                          <td className="text-muted small">{msg.email}</td>
                          <td style={{ maxWidth: 420, wordBreak: 'break-word' }}>{msg.message}</td>
                          <td className="text-nowrap small text-muted">{new Date(msg.createdAt).toLocaleString()}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactMessages;
