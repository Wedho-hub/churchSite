import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function BlogPublicList() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get("/api/blogs");
        setBlogs(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to load blogs");
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) return <div className="container mt-4">Loading blogs...</div>;
  if (error)
    return <div className="container mt-4 alert alert-danger">{error}</div>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">📝 Church Blog</h2>

      {blogs.length === 0 && <p>No blog posts yet.</p>}

      <div className="row g-4">
        {blogs.map((blog) => (
          <div key={blog._id} className="col-md-6 col-lg-4 mb-4">
            <div className="card h-100 shadow-lg border-0 blog-card">
              {blog.image && (
                <img
                  src={blog.image}
                  className="card-img-top rounded-top"
                  alt={blog.title}
                  style={{ height: "220px", objectFit: "cover" }}
                />
              )}
              <div className="card-body d-flex flex-column">
                <h5 className="card-title fw-bold mb-2 text-primary">{blog.title}</h5>
                <p className="card-text text-secondary mb-3" style={{ minHeight: 60 }}>
                  {blog.content.length > 120
                    ? blog.content.substring(0, 120) + "..."
                    : blog.content}
                </p>
                <Link
                  to={`/blogs/${blog.slug}`}
                  className="mt-auto btn btn-outline-primary fw-semibold"
                >
                  📖 Read More
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BlogPublicList;
