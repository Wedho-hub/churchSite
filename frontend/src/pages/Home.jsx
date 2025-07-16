/**
 * Home page component displaying hero, daily verse, gallery, quick links, latest blogs, weather, map, and CTA.
 * Fetches blogs and gallery data from backend APIs.
 */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import WeatherWidget from "../components/WeatherWidget";

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
      .then((res) => {
        // Take only first 3 blogs for display
        setBlogs(res.data.slice(0, 3));
      })
      .catch((err) => {
        console.error("Blogs fetch error:", err);
        setBlogs([]); // Reset blogs on error
      });

    // Fetch gallery images from backend API
    axios.get("/api/gallery")
      .then((res) => {
        console.log("Gallery response:", res.data); // Debug log
        // Support both res.data and res.data.data formats
        const data = res.data?.data || res.data;
        if (Array.isArray(data)) {
          // Take only first 5 images for display
          setGallery(data.slice(0, 5));
        } else {
          console.warn("Gallery response was not an array:", data);
          setGallery([]); // Reset gallery if response invalid
        }
      })
      .catch((err) => {
        console.error("Gallery fetch error:", err);
        setGallery([]); // Reset gallery on error
      });
  }, []);

  return (
    <div className="container mt-4">

      {/* Hero section with background image and church title */}
      <div className="hero mb-5 p-5 text-white text-center rounded" style={{
        background: "url('/hero.jpg') center/cover",
        minHeight: 250
      }}>
        <h1 className="display-4 fw-bold">Inkosiyeza SDA Church</h1>
        <p className="lead">"Preparing a people to meet their God"</p>
      </div>

      {/* Daily Verse section */}
      <div className="alert alert-secondary text-center" bg="success">
        <strong>Daily Verse:</strong> <em>{verse}</em>
      </div>

      {/* Gallery Slideshow - only render if gallery has images */}
      {gallery.length > 0 && (
        <div id="galleryCarousel" className="carousel slide mb-5" data-bs-ride="carousel">
          <div className="carousel-inner rounded shadow-sm">
            {gallery.map((img, idx) => (
              <div className={`carousel-item ${idx === 0 ? 'active' : ''}`} key={img._id}>
                <img src={img.url} className="d-block w-100" style={{ maxHeight: '400px', objectFit: 'cover' }} alt={img.caption || "Gallery image"} />
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

      {/* Quick Links section with cards linking to other pages */}
      <div className="row g-3 mb-5">
        {[
          { to: "/ministries", title: "🙌🏽 Ministries", text: "See our active departments" },
          { to: "/bulletins", title: "📢 Announcements", text: "News and events" },
          { to: "/resources", title: "📚 Resources", text: "Downloadable and links" },
          { to: "/gallery", title: "🖼️ Gallery", text: "Moments from our church life" }
        ].map((card, i) => (
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

      {/* Latest Blogs section */}
      <div className="mb-5">
        <h3 className="mb-3">📝 Latest Blog Posts</h3>
        <div className="row">
          {blogs.map((b) => (
            <div key={b._id} className="col-md-4 mb-3">
              <div className="card h-100 shadow-sm">
                {b.image && (
                  <img src={b.image} className="card-img-top" style={{ maxHeight: 200, objectFit: "cover" }} alt={b.title} />
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

      {/* Weather Widget component */}
      <div className="mb-5">
        <WeatherWidget />
      </div>

      {/* Google Maps embed */}
      <div className="mb-5">
        <h4>📍 Find Us</h4>
        <div className="ratio ratio-16x9">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18..."
            loading="lazy"
            allowFullScreen
            title="Church Location"
          />
        </div>
      </div>

      {/* Call to Action section */}
      <div className="card bg-light p-4 text-center border-0 shadow-sm mb-4">
        <h4>💒 Join Us This Sabbath!</h4>
        <p>
          Worship with us every Saturday from 9:00 AM. Everyone is welcome.
        </p>
        <Link to="/contact" className="btn btn-primary">📩 Contact Us</Link>
      </div>
    </div>
  );
}

export default Home;
