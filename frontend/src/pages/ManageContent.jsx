import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

function ManageContent() {
  const { token } = useAuth();
  const [sections, setSections] = useState([]);
  const [form, setForm] = useState({ section: '', title: '', body: '' });
  const [message, setMessage] = useState('');

  // Fetch all content sections
  const fetchSections = async () => {
    try {
      const res = await axios.get('/api/content');
      setSections(res.data);
    } catch {
      setMessage('❌ Failed to fetch sections');
    }
  };

  useEffect(() => { fetchSections(); }, []);

  // Handle form input changes
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // Create or update section
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.section) return setMessage('❌ Section ID is required');
    try {
      await axios.put(`/api/content/${form.section}`, { title: form.title, body: form.body }, { headers: { Authorization: `Bearer ${token}` } });
      setMessage(`✅ Section "${form.section}" saved`);
      setForm({ section: '', title: '', body: '' });
      fetchSections();
    } catch {
      setMessage('❌ Error saving section');
    }
  };

  // Start editing a section
  const startEdit = (sec) => {
    setForm({ section: sec.section, title: sec.title || '', body: sec.body || '' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="container mt-4">
      <h2>📝 Manage Site Sections</h2>
      {message && <div className="alert alert-info">{message}</div>}

      <form onSubmit={handleSubmit} className="mb-4 p-3 bg-white rounded shadow-sm">
        <input
          name="section"
          value={form.section}
          onChange={handleChange}
          className="form-control mb-2"
          placeholder="Section ID (e.g. about, mission)"
          required
        />
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          className="form-control mb-2"
          placeholder="Title"
        />
        <textarea
          name="body"
          value={form.body}
          onChange={handleChange}
          className="form-control mb-2"
          rows={5}
          placeholder="Body content"
        />
        <button className="btn btn-primary">
          {sections.find((s) => s.section === form.section)
            ? 'Update Section ✏️'
            : 'Create Section ➕'}
        </button>
      </form>

      <ul className="list-group">
        {sections.map((s) => (
          <li key={s.section} className="list-group-item d-flex justify-content-between">
            <div>
              <strong>{s.section}</strong>: {s.title || '(No title)'}
            </div>
            <button
              className="btn btn-sm btn-secondary"
              onClick={() => startEdit(s)}
            >
              ✏️ Edit
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ManageContent;
