import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import ImageUpload from '../components/ImageUploads'; // ✅ Ensure correct file name here

function ManageBlogs() {
  const { token } = useAuth();
  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState({ title: '', content: '', image: '', _id: null });
  const [message, setMsg] = useState('');

  const fetchBlogs = async () => {
    const res = await axios.get('/api/blogs');
    setBlogs(res.data);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (form._id) {
        // Update existing blog
        await axios.put(`/api/blogs/${form._id}`, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMsg('✅ Blog updated');
      } else {
        // Create new blog
        await axios.post('/api/blogs', form, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMsg('✅ Blog created');
      }

      setForm({ title: '', content: '', image: '', _id: null });
      fetchBlogs();
    } catch (err) {
      console.error(err);
      setMsg('❌ Error saving blog');
    }
  };

  const deleteBlog = async (id) => {
    if (!window.confirm('Delete this blog?')) return;
    try {
      await axios.delete(`/api/blogs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMsg('🗑️ Blog deleted');
      fetchBlogs();
    } catch (err) {
      console.error(err);
      setMsg('❌ Error deleting blog');
    }
  };

  const startEdit = (blog) => {
    setForm({
      title: blog.title,
      content: blog.content,
      image: blog.image,
      _id: blog._id,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to form
  };

  return (
    <div className="container mt-4">
      <h2>Manage Blogs</h2>
      {message && <div className="alert alert-info">{message}</div>}

      <form onSubmit={handleSubmit} className="mb-4">
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          className="form-control mb-2"
          placeholder="Blog title"
          required
        />

        <textarea
          name="content"
          value={form.content}
          onChange={handleChange}
          className="form-control mb-2"
          rows="5"
          placeholder="Content"
          required
        />

        {/* 🔗 Image uploader */}
        <ImageUpload onUpload={(url) => setForm({ ...form, image: url })} />

        {form.image && (
          <div className="mb-2">
            <span className="badge bg-success">Image attached</span>
          </div>
        )}

        <button className="btn btn-primary">
          {form._id ? 'Update Blog ✏️' : 'Post Blog ➕'}
        </button>
      </form>

      {/* List of blogs */}
      <ul className="list-group">
        {blogs.map((b) => (
          <li key={b._id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <strong>{b.title}</strong>
              {b.image && (
                <img
                  src={b.image}
                  alt="thumb"
                  style={{ maxHeight: 50, marginLeft: 10 }}
                />
              )}
            </div>

            <div>
              <button className="btn btn-sm btn-warning me-2" onClick={() => startEdit(b)}>
                ✏️ Edit
              </button>
              <button className="btn btn-sm btn-danger" onClick={() => deleteBlog(b._id)}>
                🗑️ Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ManageBlogs;
