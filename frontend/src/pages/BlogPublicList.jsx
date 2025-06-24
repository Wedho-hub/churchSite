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

      <div className="row">
        {blogs.map((blog) => (
          <div key={blog._id} className="col-md-6 mb-4">
            <div className="card h-100 shadow-sm">
              {blog.image && (
                <img
                  src={blog.image}
                  className="card-img-top"
                  alt={blog.title}
                  style={{ height: "200px", objectFit: "cover" }}
                />
              )}

              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{blog.title}</h5>
                <p className="card-text">
                  {blog.content.length > 100
                    ? blog.content.substring(0, 100) + "..."
                    : blog.content}
                </p>
                <Link
                  to={`/blogs/${blog.slug}`}
                  className="mt-auto btn btn-primary"
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
