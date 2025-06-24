import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function BlogDetail() {
  const { slug } = useParams(); // 🔑 Get the slug from the URL
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`/api/blogs/slug/${slug}`);
        setBlog(res.data);
      } catch (err) {
        console.error(err);
        setError('Blog not found');
      }
    };

    fetchBlog();
  }, [slug]);

  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger">{error}</div>
        <Link to="/blogs" className="btn btn-secondary">⬅ Back to Blog List</Link>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="container mt-4">
        <div className="text-center">Loading blog...</div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2>{blog.title}</h2>

      {blog.image && (
        <img
          src={blog.image}
          alt={blog.title}
          className="img-fluid my-3 rounded"
        />
      )}

      <p>{blog.content}</p>

      <Link to="/blogs" className="btn btn-outline-primary mt-4">⬅ Back to Blog List</Link>
    </div>
  );
}

export default BlogDetail;
