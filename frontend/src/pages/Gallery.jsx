import { useEffect, useState } from 'react';
import axios from 'axios';

function Gallery() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    axios.get('/api/gallery')
      .then(res => setImages(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">🖼️ Church Gallery</h2>
      <div className="row g-3">
        {images.map(img => (
          <div key={img._id} className="col-6 col-md-4 col-lg-3">
            <div className="card h-100 shadow-sm gallery-card">
              <img
                src={img.url}
                alt="Gallery"
                className="card-img-top gallery-img"
              />
              <div className="card-body p-2 text-center">
                <small className="text-muted">{img.caption}</small>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Gallery;
