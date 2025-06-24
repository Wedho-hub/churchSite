import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

function ContactMessages() {
  const { token } = useAuth();
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState("");

  const fetchMessages = async () => {
    try {
      const res = await axios.get("/api/messages", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessages(res.data);
    } catch (err) {
      setError("Failed to load messages");
      console.error(err);
    }
  };

  const markAsRead = async (id) => {
    try {
      await axios.put(
        `/api/messages/${id}/read`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchMessages(); // refresh list
    } catch (err) {
      console.error("Could not mark as read", err);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Contact Messages</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      {messages.length === 0 ? (
        <p>No messages found.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-striped mt-3">
            <thead>
              <tr>
                <th>From</th>
                <th>Email</th>
                <th>Message</th>
                <th>Status</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((msg) => (
                <tr key={msg._id}>
                  <td>{msg.name}</td>
                  <td>{msg.email}</td>
                  <td>{msg.message}</td>
                  <td>
                    {msg.read ? (
                      <span className="badge bg-success">Read</span>
                    ) : (
                      <span className="badge bg-warning text-dark">Unread</span>
                    )}
                  </td>
                  <td>{new Date(msg.createdAt).toLocaleString()}</td>
                  <td>
                    {!msg.read && (
                      <button
                        onClick={() => markAsRead(msg._id)}
                        className="btn btn-sm btn-primary"
                      >
                        Mark as Read
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ContactMessages;
