import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

function ContactMessages() {
  const { token } = useAuth();
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState("");

  // Fetch all contact messages
  const fetchMessages = async () => {
    try {
      const res = await axios.get('/api/messages', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessages(res.data);
    } catch {
      setError('❌ Failed to fetch messages');
    }
  };

  useEffect(() => { fetchMessages(); }, []);

  return (
    <div className="container mt-4">
      <h2>📬 Contact Messages</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="table-responsive bg-white rounded shadow-sm p-3">
        <table className="table table-striped align-middle">
          <thead className="table-light">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Message</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {messages.length === 0 ? (
              <tr><td colSpan="4" className="text-center">No messages found.</td></tr>
            ) : (
              messages.map((msg) => (
                <tr key={msg._id}>
                  <td>{msg.name}</td>
                  <td>{msg.email}</td>
                  <td style={{maxWidth: 300, wordBreak: 'break-word'}}>{msg.message}</td>
                  <td>{new Date(msg.createdAt).toLocaleString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ContactMessages;
