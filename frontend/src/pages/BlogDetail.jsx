import { useEffect, useState } from 'react';
import BackToTop from '../components/BackToTop';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function BlogDetail() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`/api/blogs/${slug}`);
        setBlog(res.data);
      } catch (err) {
        setError('Blog not found');
        console.error('Fetch blog error', err?.response || err.message || err);
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

  if (!blog) return (
    <div className="container mt-4 text-center">Loading blog...</div>
  );

  // Normalize content into five logical paragraphs: intro, main1, main2, main3, conclusion
  const introMatch = blog.content?.match(/# Introduction\n([\s\S]*?)(?=# Main Discussion|# Conclusion|$)/);
  const mainMatch = blog.content?.match(/# Main Discussion\n([\s\S]*?)(?=# Conclusion|$)/);
  const conclMatch = blog.content?.match(/# Conclusion\n([\s\S]*)/);
  const intro = introMatch ? introMatch[1].trim() : '';
  let mains = mainMatch ? mainMatch[1].split(/\n\n+|\n/).map(s => s.trim()).filter(Boolean) : [];
  while (mains.length < 3) mains.push('');
  const [main1, main2, main3] = mains;
  const conclusion = conclMatch ? conclMatch[1].trim() : '';
  const paragraphs = [intro, main1, main2, main3, conclusion];

  return (
    <div className="container mt-4">
      <article className="blog-article newspaper p-4 bg-white rounded shadow-custom position-relative">
        <h2 className="display-4 mb-4 text-center text-gradient fw-bold" style={{ fontFamily: 'Merriweather, serif', letterSpacing: '0.02em' }}>{blog.title}</h2>
        <div className="row g-4 align-items-start">
          {blog.image && (
            <div className="col-md-5 col-lg-4 mb-3 mb-md-0">
              <img
                src={blog.image}
                alt={blog.title}
                className="img-fluid rounded shadow-sm w-100 blog-image-inset"
                style={{ maxHeight: 420, objectFit: 'cover' }}
              />
            </div>
          )}

          <div className={blog.image ? 'col-md-7 col-lg-8' : 'col-12'}>
            {paragraphs.map((para, idx) => {
              if (!para) return null;
              const isBlock = /^>\s?/.test(para);
              const clean = isBlock ? para.replace(/^>\s?/, '') : para;

              // Intro as larger paragraph with drop cap
              if (idx === 0) {
                return (
                  <section key={idx} className="mb-4">
                    <p className="newspaper-paragraph intro-paragraph fs-5 lh-lg" dangerouslySetInnerHTML={{ __html: clean.replace(/\n/g, '<br/>') }} />
                  </section>
                );
              }

              if (isBlock) {
                return (
                  <blockquote key={idx} className="blockquote-highlight mb-4">
                    <p className="mb-0" dangerouslySetInnerHTML={{ __html: clean.replace(/\n/g, '<br/>') }} />
                  </blockquote>
                );
              }

              return (
                <p key={idx} className="newspaper-paragraph fs-6 lh-lg mb-4" dangerouslySetInnerHTML={{ __html: para.replace(/\n/g, '<br/>') }} />
              );
            })}

            {conclusion && (
              <div className="mt-3">
                <a href="#" className="btn btn-primary">Share this message</a>
              </div>
            )}
          </div>
        </div>
      </article>
      <Link to="/blogs" className="btn btn-outline-primary mt-4">← Back to Blog List</Link>
      <BackToTop />
    </div>
  );
}

export default BlogDetail;
