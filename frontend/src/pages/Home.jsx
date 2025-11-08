/**
 * Home page component displaying hero, daily verse, gallery, quick links, latest blogs, weather, map, and CTA.
 * Fetches blogs and gallery data from backend APIs.
 */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import WeatherWidget from "../components/WeatherWidget";
import BackToTop from "../components/BackToTop";

function Home() {
  // State to hold latest blog posts
  const [blogs, setBlogs] = useState([]);
  // State to hold gallery images
  const [gallery, setGallery] = useState([]);
  // Daily verse to display
  const verse = "Isaiah 41:10 — Fear not, for I am with you...";

  useEffect(() => {
    // Fetch latest blogs from backend API
    axios.get("/api/blogs")
      .then((res) => setBlogs(res.data.slice(0, 3)))
      .catch(() => setBlogs([]));

    // Fetch gallery images from backend API
    axios.get("/api/gallery")
      .then((res) => {
        const data = res.data?.data || res.data;
        setGallery(Array.isArray(data) ? data.slice(0, 5) : []);
      })
      .catch(() => setGallery([]));
  }, []);

  return (
    <>
      <div className="container mt-4">
        {/* Enhanced Hero section */}
        <div className="hero mb-5 position-relative text-white text-center rounded overflow-hidden" style={{
          // background: "url('/hero.jpg') center/cover",
          minHeight: 420,
          maxHeight: 600,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          boxShadow: '0 4px 32px rgba(0,0,0,0.12)',
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.25) 100%)',
            zIndex: 1
          }} />
          <div style={{ position: 'relative', zIndex: 2, padding: '3rem 1rem' }}>
            <h1 className="display-2 fw-bold mb-3" style={{ textShadow: '0 2px 16px rgba(0,0,0,0.4)' }}>Inkosiyeza SDA Church</h1>
            <p className="lead fs-3 mb-4" style={{ textShadow: '0 1px 8px rgba(0,0,0,0.3)' }}>
              "Preparing a people to meet their God"
            </p>
            <Link to="/about" className="btn btn-light btn-lg shadow-sm px-4 py-2 fw-semibold">
              Learn More About Us
            </Link>
          </div>
        </div>
        {/* Daily Verse */}
        <div className="alert alert-secondary text-center">
          <strong>Daily Verse:</strong> <em>{verse}</em>
        </div>
        {/* Gallery Slideshow */}
        {gallery.length > 0 && (
          <div id="galleryCarousel" className="carousel slide mb-5" data-bs-ride="carousel">
            <div className="carousel-inner rounded shadow-sm">
              {gallery.map((img, idx) => (
                <div className={`carousel-item ${idx === 0 ? 'active' : ''}`} key={img._id || idx}>
                  <img src={img.url} className="d-block w-100" style={{ maxHeight: '400px', objectFit: 'cover' }} alt={img.caption || "Gallery image"} loading="lazy" />
                  {img.caption && (
                    <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded">
                      <p>{img.caption}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        {/* Quick Links */}
        <div className="row g-3 mb-5">
          {([
            { to: "/ministries", title: "🙏🏽 Ministries", text: "See our active departments" },
            { to: "/bulletins", title: "📢 Announcements", text: "News and events" },
            { to: "/resources", title: "📚 Resources", text: "Downloadable and links" },
            { to: "/gallery", title: "🖼️ Gallery", text: "Moments from our church life" }
          ]).map((card, i) => (
            <div className="col-md-3" key={i}>
              <Link to={card.to} className="text-decoration-none">
                <div className="card shadow-sm h-100 text-center">
                  <div className="card-body">
                    <h5 className="card-title">{card.title}</h5>
                    <p className="card-text">{card.text}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
        {/* Latest Blogs */}
        <div className="mb-5">
          <h3 className="mb-3">📝 Latest Blog Posts</h3>
          <div className="row">
            {blogs.map((b) => (
              <div key={b._id} className="col-md-4 mb-3">
                <div className="card h-100 shadow-sm">
                  {b.image && (
                    <img src={b.image} className="card-img-top" style={{ maxHeight: 200, objectFit: "cover" }} alt={b.title} loading="lazy" />
                  )}
                  <div className="card-body">
                    <h5 className="card-title">{b.title}</h5>
                    <p className="card-text text-truncate">{b.content.slice(0, 100)}...</p>
                    <Link to={`/blogs/${b.slug}`} className="btn btn-outline-primary btn-sm">Read More</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Weather Widget & Map Section */}
        <div className="row g-4 mb-5 align-items-stretch">
          <div className="col-md-5 col-lg-4">
            <div className="h-100 d-flex align-items-center justify-content-center">
              <WeatherWidget compact />
            </div>
          </div>
          <div className="col-md-7 col-lg-8">
            <div className="card shadow-sm h-100 p-0 border-0">
              <div className="card-body p-3 pb-0">
                <h5 className="card-title mb-2 text-primary"><i className="fas fa-map-marker-alt me-2"></i>Find Us</h5>
              </div>
              <div className="ratio ratio-16x9 rounded-bottom" style={{ minHeight: 180, maxHeight: 320 }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3312.610996123374!2d18.509818575437922!3d-33.87391481932341!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1dcc5ea5c1ca2eaf%3A0x1a4fd5ef112ea8ee!2sSinenjongo%20High%20School!5e0!3m2!1sen!2sza!4v1756485583924!5m2!1sen!2sza"
                  style={{ border: 0, borderRadius: '0 0 1rem 1rem', minHeight: 180, maxHeight: 320, width: '100%' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Church Location"
                />
              </div>
              <div className="card-footer bg-white border-0 text-end p-2">
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=Sinenjongo+High+School"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline-primary btn-sm"
                >
                  Get Directions
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* Call to Action */}
        <div className="card bg-light p-4 text-center border-0 shadow-sm mb-4">
          <h4>🎒 Join Us This Sabbath!</h4>
          <p>
            Worship with us every Saturday from 9:00 AM. Everyone is welcome.
          </p>
          <Link to="/contact" className="btn btn-primary">📩 Contact Us</Link>
        </div>
      </div>
      <BackToTop />
    </>
  );
}

export default Home;
