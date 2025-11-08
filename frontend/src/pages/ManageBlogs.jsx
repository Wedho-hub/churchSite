
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import ImageUpload from '../components/ImageUploads';
import HeaderIcon from '../components/HeaderIcon';

function ManageBlogs() {
  const { token } = useAuth();
  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState({
    title: '',
    intro: '',
    main1: '',
    main2: '',
    main3: '',
    conclusion: '',
    image: '',
    _id: null,
    slug: ''
  });
  const [message, setMsg] = useState('');

  // Fetch all blogs
  const fetchBlogs = async () => {
    try {
      const res = await axios.get('/api/blogs');
      setBlogs(res.data);
    } catch {
      setMsg('❌ Failed to fetch blogs');
    }
  };

  useEffect(() => { fetchBlogs(); }, []);

  // Handle form input changes
  // Limit lengths
  const limits = {
    title: 80,
    intro: 500,
    main: 1500,
    conclusion: 350
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    let v = value;
    if (name === 'title' && v.length > limits.title) v = v.slice(0, limits.title);
    if (name === 'intro' && v.length > limits.intro) v = v.slice(0, limits.intro);
    if ((name === 'main1' || name === 'main2' || name === 'main3') && v.length > limits.main) v = v.slice(0, limits.main);
    if (name === 'conclusion' && v.length > limits.conclusion) v = v.slice(0, limits.conclusion);
    setForm({ ...form, [name]: v });
  };

  // Create or update blog
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Compose content for backend as a single string (for backward compatibility)
    const content = `# Introduction\n${form.intro}\n\n# Main Discussion\n${form.main1}\n\n${form.main2}\n\n${form.main3}\n\n# Conclusion\n${form.conclusion}`;
    const payload = {
      ...form,
      content,
    };
    try {
      if (form._id) {
        await axios.put(`/api/blogs/${form.slug}`, payload, { headers: { Authorization: `Bearer ${token}` } });
        setMsg('✅ Blog updated');
      } else {
        await axios.post('/api/blogs', payload, { headers: { Authorization: `Bearer ${token}` } });
        setMsg('✅ Blog created');
      }
      setForm({
        title: '', intro: '', main1: '', main2: '', main3: '', conclusion: '', image: '', _id: null, slug: ''
      });
      fetchBlogs();
    } catch {
      setMsg('❌ Error saving blog');
    }
  };

  // Delete a blog
  const deleteBlog = async (slug) => {
    if (!window.confirm('Delete this blog?')) return;
    try {
      await axios.delete(`/api/blogs/${slug}`, { headers: { Authorization: `Bearer ${token}` } });
      setMsg('🗑️ Blog deleted');
      fetchBlogs();
    } catch {
      setMsg('❌ Error deleting blog');
    }
  };

  // Start editing a blog
  const startEdit = (blog) => {
    // Try to parse content into sections
    let intro = '', main1 = '', main2 = '', main3 = '', conclusion = '';
    if (blog.content) {
      // Try to split by headings
      const introMatch = blog.content.match(/# Introduction\n([\s\S]*?)(?=# Main Discussion|# Conclusion|$)/);
      const mainMatch = blog.content.match(/# Main Discussion\n([\s\S]*?)(?=# Conclusion|$)/);
      const conclMatch = blog.content.match(/# Conclusion\n([\s\S]*)/);
      intro = introMatch ? introMatch[1].trim() : '';
      let mains = mainMatch ? mainMatch[1].split(/\n\n+/).map(s => s.trim()).filter(Boolean) : [];
      [main1, main2, main3] = [mains[0] || '', mains[1] || '', mains[2] || ''];
      conclusion = conclMatch ? conclMatch[1].trim() : '';
    }
    setForm({
      title: blog.title,
      intro,
      main1,
      main2,
      main3,
      conclusion,
      image: blog.image,
      _id: blog._id,
      slug: blog.slug,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="container mt-4">
      <HeaderIcon icon="fa-pen-nib" title="Blog Management" subtitle="Create, edit and preview posts" />
      {message && <div className="alert alert-info mb-3">{message}</div>}

  <form onSubmit={handleSubmit} className="mb-4 p-4 bg-white rounded shadow-lg border blog-form">
        <div className="row g-3">
          <div className="col-md-8">
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              className="form-control form-control-lg mb-2"
              placeholder="Blog title (max 80 chars)"
              maxLength={limits.title}
              required
            />
            <div className="char-count">{limits.title - (form.title?.length || 0)} characters remaining</div>
            <label className="fw-bold"><i className="fas fa-lightbulb me-2 text-warning"></i> Introduction</label>
            <textarea
              name="intro"
              value={form.intro}
              onChange={handleChange}
              className="form-control mb-2"
              rows="2"
              placeholder="Introduction (max 300 chars)"
              maxLength={limits.intro}
              required
            />
            <div className="char-count">{limits.intro - (form.intro?.length || 0)} characters remaining</div>
            <label className="fw-bold">Main Discussion (3 paragraphs, each max 400 chars):</label>
            <textarea
              name="main1"
              value={form.main1}
              onChange={handleChange}
              className="form-control mb-2"
              rows="2"
              placeholder="Main paragraph 1"
              maxLength={limits.main}
              required
            />
            <div className="char-count">{limits.main - (form.main1?.length || 0)} remaining</div>
            <textarea
              name="main2"
              value={form.main2}
              onChange={handleChange}
              className="form-control mb-2"
              rows="2"
              placeholder="Main paragraph 2"
              maxLength={limits.main}
              required
            />
            <div className="char-count">{limits.main - (form.main2?.length || 0)} remaining</div>
            <textarea
              name="main3"
              value={form.main3}
              onChange={handleChange}
              className="form-control mb-2"
              rows="2"
              placeholder="Main paragraph 3"
              maxLength={limits.main}
              required
            />
            <div className="char-count">{limits.main - (form.main3?.length || 0)} remaining</div>
            <label className="fw-bold mt-2"><i className="fas fa-check-circle me-2 text-success"></i> Conclusion</label>
            <textarea
              name="conclusion"
              value={form.conclusion}
              onChange={handleChange}
              className="form-control mb-2"
              rows="2"
              placeholder="Conclusion (max 250 chars)"
              maxLength={limits.conclusion}
              required
            />
            <div className="char-count">{limits.conclusion - (form.conclusion?.length || 0)} characters remaining</div>
          </div>
          <div className="col-md-4">
            <div className="mb-2">
              <label className="fw-bold"><i className="fas fa-image me-2 text-info"></i> Blog Image (jpg/png, max 2MB):</label>
              <ImageUpload onUpload={(url) => setForm({ ...form, image: url })} />
              {form.image && (
                <span className="badge bg-success mt-2">Image attached</span>
              )}
            </div>
            <button className="btn btn-primary w-100 mt-3" style={{ fontSize: '1.1rem' }}>
              {form.slug ? 'Update Blog ✏️' : 'Post Blog ➕'}
            </button>
          </div>
        </div>
      </form>

      {/* Live preview of how article will look */}
      <div className="mb-4">
        <h5 className="mb-2">Preview</h5>
        <div className="card p-3 shadow-sm">
          <div className="d-flex gap-3 align-items-start">
            {form.image && <img src={form.image} alt="preview" style={{ width: 120, height: 90, objectFit: 'cover', borderRadius: 8 }} />}
            <div>
              <strong className="d-block mb-1">{form.title || 'Title preview'}</strong>
              <p className="mb-0 intro-paragraph small" style={{ maxWidth: 680 }}>
                {form.intro || 'Introduction preview...'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* List of blogs */}
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-header bg-primary text-white fw-bold">All Blog Posts</div>
        <ul className="list-group list-group-flush">
          {blogs.map((b) => (
            <li key={b._id} className="list-group-item d-flex justify-content-between align-items-center py-3">
              <div className="d-flex align-items-center">
                <strong className="me-2">{b.title}</strong>
                {b.image && (
                  <img
                    src={b.image}
                    alt="thumb"
                    style={{ maxHeight: 50, marginLeft: 10, borderRadius: 6, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
                  />
                )}
              </div>
              <div>
                <button className="btn btn-sm btn-warning me-2" onClick={() => startEdit(b)}>
                  ✏️ Edit
                </button>
                <button className="btn btn-sm btn-danger" onClick={() => deleteBlog(b.slug)}>
                  🗑️ Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ManageBlogs;
