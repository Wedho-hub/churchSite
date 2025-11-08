
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import HeaderIcon from '../components/HeaderIcon';


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
      <HeaderIcon icon="fa-hands-praying" title="Manage Ministries" subtitle="Add and edit ministries" />
      {message && <div className="alert alert-info">{message}</div>}

      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <form onSubmit={handleSubmit} className="mb-0">
            <div className="row g-2 align-items-center">
              <div className="col-sm-5">
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Ministry Name"
                  required
                />
              </div>
              <div className="col-sm-5">
                <input
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Short description"
                />
              </div>
              <div className="col-sm-2 d-flex gap-2">
                <button className="btn btn-primary w-100" type="submit">
                  {form._id ? 'Update' : 'Create'}
                </button>
                {form._id && (
                  <button
                    type="button"
                    className="btn btn-outline-secondary w-100"
                    onClick={() => setForm({ _id: '', name: '', description: '' })}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>

      <ul className="list-group">
        {ministries.map((min) => (
          <li key={min._id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <strong className="d-block">{min.name}</strong>
              <small className="text-muted">{min.description}</small>
            </div>
            <div>
              <button
                className="btn btn-sm btn-outline-primary me-2"
                onClick={() => startEdit(min)}
              >
                ✏️ Edit
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ManageMinistries;
