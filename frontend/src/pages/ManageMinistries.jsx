import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

function ManageMinistries() {
  const { token } = useAuth();
  const [ministries, setMinistries] = useState([]);
  const [form, setForm] = useState({
    name: '',
    leader: '',
    description: '',
    functions: '',
    _id: null,
  });
  const [message, setMsg] = useState('');

  // Fetch existing ministries
  const fetchMinistries = async () => {
    try {
      const res = await axios.get('/api/ministries');
      setMinistries(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMinistries();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Submit form (create or update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const ministryData = {
      name: form.name,
      leader: form.leader,
      description: form.description,
      functions: form.functions.split(',').map(f => f.trim()),
    };

    try {
      if (form._id) {
        await axios.put(`/api/ministries/${form._id}`, ministryData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMsg('✅ Ministry updated');
      } else {
        await axios.post('/api/ministries', ministryData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMsg('✅ Ministry created');
      }

      setForm({ name: '', leader: '', description: '', functions: '', _id: null });
      fetchMinistries();
    } catch (err) {
      console.error(err);
      setMsg('❌ Error saving ministry');
    }
  };

  // Start editing a ministry
  const startEdit = (m) => {
    setForm({
      name: m.name,
      leader: m.leader,
      description: m.description || '',
      functions: m.functions?.join(', ') || '',
      _id: m._id,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Delete a ministry
  const deleteMinistry = async (id) => {
    if (!window.confirm('Delete this ministry?')) return;
    try {
      await axios.delete(`/api/ministries/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMsg('🗑️ Ministry deleted');
      fetchMinistries();
    } catch (err) {
      console.error(err);
      setMsg('❌ Error deleting ministry');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Manage Ministries</h2>
      {message && <div className="alert alert-info">{message}</div>}

      <form onSubmit={handleSubmit} className="mb-4">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          className="form-control mb-2"
          placeholder="Ministry name"
          required
        />

        <input
          name="leader"
          value={form.leader}
          onChange={handleChange}
          className="form-control mb-2"
          placeholder="Leader's name"
          required
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="form-control mb-2"
          placeholder="Brief description (optional)"
        />

        <input
          name="functions"
          value={form.functions}
          onChange={handleChange}
          className="form-control mb-2"
          placeholder="Functions (comma-separated)"
        />

        <button className="btn btn-primary">
          {form._id ? 'Update Ministry ✏️' : 'Add Ministry ➕'}
        </button>
      </form>

      {/* Ministries List */}
      <ul className="list-group">
        {ministries.map((m) => (
          <li
            key={m._id}
            className="list-group-item d-flex justify-content-between align-items-start"
          >
            <div>
              <h5>{m.name}</h5>
              <p className="mb-1"><strong>Leader:</strong> {m.leader}</p>
              {m.description && <p className="mb-1">{m.description}</p>}
              {m.functions && (
                <ul>
                  {m.functions.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              )}
            </div>

            <div>
              <button
                className="btn btn-sm btn-warning me-2"
                onClick={() => startEdit(m)}
              >
                ✏️ Edit
              </button>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => deleteMinistry(m._id)}
              >
                🗑️ Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ManageMinistries;
