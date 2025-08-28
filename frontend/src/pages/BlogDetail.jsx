import { useEffect, useState } from 'react';
import BackToTop from '../components/BackToTop';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function BlogDetail() {
  const { slug } = useParams(); // 🔑 Get the slug from the URL
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`/api/blogs/${slug}`);
        setBlog(res.data);
      } catch {
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
    <>
      <div className="container mt-4">
        <article className="blog-article newspaper p-4 bg-white rounded shadow-custom position-relative">
          <h2 className="display-5 mb-3 text-center text-gradient" style={{fontFamily: 'Merriweather, serif', letterSpacing: '0.02em'}}>{blog.title}</h2>
          {blog.image && (
            <img
              src={blog.image}
              alt={blog.title}
              className="blog-image-float img-fluid rounded ms-3 mb-3 float-md-end"
              style={{ maxWidth: 340, maxHeight: 340, objectFit: 'cover', boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}
            />
          )}
          {/* Parse and display all blog sections with subheadings */}
          {(() => {
            if (!blog.content) return null;
            // Parse sections by headings
            const introMatch = blog.content.match(/# Introduction\n([\s\S]*?)(?=# Main Discussion|# Conclusion|$)/);
            const mainMatch = blog.content.match(/# Main Discussion\n([\s\S]*?)(?=# Conclusion|$)/);
            const conclMatch = blog.content.match(/# Conclusion\n([\s\S]*)/);
            const intro = introMatch ? introMatch[1].trim() : '';
            // Split main discussion into paragraphs by double newlines or single newlines
            let mains = mainMatch ? mainMatch[1].split(/\n\n+|\n/).map(s => s.trim()).filter(Boolean) : [];
            const conclusion = conclMatch ? conclMatch[1].trim() : '';
            return (
              <div>
                {intro && (
                  <section className="mb-4">
                    <h5 className="fw-bold text-primary newspaper-heading">Introduction</h5>
                    <p className="newspaper-paragraph">{intro}</p>
                  </section>
                )}
                {mains.length > 0 && (
                  <section className="mb-4">
                    <h5 className="fw-bold text-primary newspaper-heading">Main Discussion</h5>
                    {mains.map((para, idx) => (
                      <p key={idx} className="newspaper-paragraph" style={{marginBottom: '1.1em'}}>{para}</p>
                    ))}
                  </section>
                )}
                {conclusion && (
                  <section className="mb-2">
                    <h5 className="fw-bold text-primary newspaper-heading">Conclusion</h5>
                    <p className="newspaper-paragraph">{conclusion}</p>
                  </section>
                )}
              </div>
            );
          })()}
        </article>
        <Link to="/blogs" className="btn btn-outline-primary mt-4"> Back to Blog List</Link>
      </div>
      <BackToTop />
    </>
  );
}

export default BlogDetail;
