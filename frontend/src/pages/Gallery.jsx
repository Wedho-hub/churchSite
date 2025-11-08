
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import ImageUpload from '../components/ImageUploads';

function Gallery() {
  const { token } = useAuth();
  const [images, setImages] = useState([]);
  const [msg, setMsg] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    axios.get('/api/gallery')
      .then(res => setImages(res.data))
      .catch(err => console.error(err));
  }, []);

  // Handle image upload
  const handleUpload = async (url) => {
    try {
      // Save image to gallery (backend should handle this route)
      await axios.post('/api/gallery', { url }, { headers: { Authorization: `Bearer ${token}` } });
      setMsg('✅ Image added to gallery');
      axios.get('/api/gallery').then(res => setImages(res.data));
    } catch {
      setMsg('❌ Failed to add image');
    }
  };

  const openModal = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="container mt-4">
      <div className="hero-section text-center py-5 mb-5 rounded-3">
        <h1 className="display-4 fw-bold text-white mb-3">🖼️ Church Gallery</h1>
        <p className="lead text-white-50 mb-0">Explore our collection of church events, activities, and community moments</p>
      </div>

      {/* Stats Section */}
      <div className="row mb-4">
        <div className="col-md-12">
          <div className="card stat-card text-center">
            <div className="card-body">
              <div className="stat-card-icon primary mb-3">
                <i className="fas fa-images"></i>
              </div>
              <div className="stat-card-value">{images.length}</div>
              <div className="stat-card-label">Gallery Images</div>
            </div>
          </div>
        </div>
      </div>

      {token && (
        <div className="mb-4 p-4 bg-light rounded-3 shadow-sm">
          <h5 className="mb-3 text-primary">
            <i className="fas fa-camera me-2"></i>Upload New Gallery Image
          </h5>
          <ImageUpload onUpload={handleUpload} />
          {msg && <div className="small text-success mt-3"><i className="fas fa-check-circle me-1"></i>{msg}</div>}
        </div>
      )}

      <div className="row g-4">
        {images.map(img => (
          <div key={img._id} className="col-6 col-md-4 col-lg-3">
            <div className="card h-100 shadow-sm gallery-card border-0" onClick={() => openModal(img)} style={{ cursor: 'pointer' }}>
              <div className="position-relative overflow-hidden rounded-top">
                <img
                  src={img.url}
                  alt="Gallery"
                  className="card-img-top gallery-img w-100"
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <div className="position-absolute top-50 start-50 translate-middle opacity-0 hover-overlay d-flex align-items-center justify-content-center">
                  <i className="fas fa-search-plus fa-2x text-white"></i>
                </div>
              </div>
              <div className="card-body p-3 text-center">
                <small className="text-muted">{img.caption || 'Church Event'}</small>
              </div>
            </div>
          </div>
        ))}
      </div>

      {images.length === 0 && (
        <div className="text-center py-5">
          <i className="fas fa-images fa-3x text-muted mb-3"></i>
          <h4 className="text-muted">No images in gallery</h4>
          <p className="text-muted">Check back later for photos from our church events and activities.</p>
        </div>
      )}

      {/* Modal for full-size image */}
      {selectedImage && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.8)' }} onClick={closeModal}>
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content border-0">
              <div className="modal-body p-0">
                <img
                  src={selectedImage.url}
                  alt="Gallery"
                  className="w-100"
                  style={{ maxHeight: '80vh', objectFit: 'contain' }}
                />
              </div>
              <div className="modal-footer border-0">
                <small className="text-muted">{selectedImage.caption || 'Church Event'}</small>
                <button type="button" className="btn-close" onClick={closeModal}></button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Gallery;
