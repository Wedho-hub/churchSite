
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';


function ManageMinistries() {
  const { token } = useAuth();
  const [ministries, setMinistries] = useState([]);
  const [form, setForm] = useState({ _id: '', name: '', description: '' });
  const [message, setMessage] = useState('');

  // Fetch all ministries
  const fetchMinistries = async () => {
    try {
      const res = await axios.get('/api/ministries');
      setMinistries(res.data);
    } catch {
      setMessage('❌ Failed to fetch ministries');
    }
  };

  useEffect(() => { fetchMinistries(); }, []);

  // Handle form input changes
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // Create or update ministry
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name) return setMessage('❌ Name is required');
    try {
      if (form._id) {
        await axios.put(`/api/ministries/${form._id}`, { name: form.name, description: form.description }, { headers: { Authorization: `Bearer ${token}` } });
        setMessage('✅ Ministry updated');
      } else {
        await axios.post('/api/ministries', { name: form.name, description: form.description }, { headers: { Authorization: `Bearer ${token}` } });
        setMessage('✅ Ministry created');
      }
      setForm({ _id: '', name: '', description: '' });
      fetchMinistries();
    } catch {
      setMessage('❌ Error saving ministry');
    }
  };

  // Start editing a ministry
  const startEdit = (min) => {
    setForm({ _id: min._id, name: min.name, description: min.description || '' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="container mt-4">
      <h2>🙏 Manage Ministries</h2>
      {message && <div className="alert alert-info">{message}</div>}

      <form onSubmit={handleSubmit} className="mb-4 p-3 bg-white rounded shadow-sm">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          className="form-control mb-2"
          placeholder="Ministry Name"
          required
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="form-control mb-2"
          rows={3}
          placeholder="Description"
        />
        <button className="btn btn-primary">
          {form._id ? 'Update Ministry ✏️' : 'Create Ministry ➕'}
        </button>
        {form._id && (
          <button
            type="button"
            className="btn btn-secondary ms-2"
            onClick={() => setForm({ _id: '', name: '', description: '' })}
          >
            Cancel
          </button>
        )}
      </form>

      <ul className="list-group">
        {ministries.map((min) => (
          <li key={min._id} className="list-group-item d-flex justify-content-between">
            <div>
              <strong>{min.name}</strong>: {min.description}
            </div>
            <button
              className="btn btn-sm btn-secondary"
              onClick={() => startEdit(min)}
            >
              ✏️ Edit
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ManageMinistries;
