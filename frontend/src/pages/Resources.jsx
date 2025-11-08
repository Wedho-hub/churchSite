
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import ImageUpload from '../components/ImageUploads';

function Resources() {
  const { token } = useAuth();
  const [resources, setResources] = useState([]);
  const [msg, setMsg] = useState('');
  const [stats, setStats] = useState({ total: 0, files: 0, links: 0 });

  useEffect(() => {
    axios.get('/api/resources')
      .then(res => {
        setResources(res.data.resources);
        setStats(res.data.stats);
      })
      .catch(err => console.error(err));
  }, []);

  // Handle resource image upload
  const handleUpload = async (url) => {
    try {
      // Save image as a resource (backend should handle this route)
      await axios.post('/api/resources', { link: url, type: 'file', title: 'New Resource', description: 'Uploaded image' }, { headers: { Authorization: `Bearer ${token}` } });
      setMsg('✅ Resource image uploaded');
      axios.get('/api/resources').then(res => {
        setResources(res.data.resources);
        setStats(res.data.stats);
      });
    } catch {
      setMsg('❌ Failed to upload resource image');
    }
  };

  return (
    <div className="container mt-4">
      <div className="hero-section text-center py-5 mb-5 rounded-3">
        <h1 className="display-4 fw-bold text-white mb-3">📚 Study Resources & Downloads</h1>
        <p className="lead text-white-50 mb-0">Access our comprehensive collection of spiritual materials, study guides, and educational resources</p>
      </div>

      {/* Stats Section */}
      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card stat-card text-center">
            <div className="card-body">
              <div className="stat-card-icon primary mb-3">
                <i className="fas fa-book"></i>
              </div>
              <div className="stat-card-value">{stats.total}</div>
              <div className="stat-card-label">Total Resources</div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card stat-card text-center">
            <div className="card-body">
              <div className="stat-card-icon success mb-3">
                <i className="fas fa-file-download"></i>
              </div>
              <div className="stat-card-value">{stats.files}</div>
              <div className="stat-card-label">Downloadable Files</div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card stat-card text-center">
            <div className="card-body">
              <div className="stat-card-icon info mb-3">
                <i className="fas fa-external-link-alt"></i>
              </div>
              <div className="stat-card-value">{stats.links}</div>
              <div className="stat-card-label">External Links</div>
            </div>
          </div>
        </div>
      </div>

      {token && (
        <div className="mb-4 p-4 bg-light rounded-3 shadow-sm">
          <h5 className="mb-3 text-primary">
            <i className="fas fa-upload me-2"></i>Upload New Resource
          </h5>
          <ImageUpload onUpload={handleUpload} />
          {msg && <div className="small text-success mt-3"><i className="fas fa-check-circle me-1"></i>{msg}</div>}
        </div>
      )}

      <div className="row">
        {resources.map((res) => (
          <div key={res._id} className="col-lg-4 col-md-6 mb-4">
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body d-flex flex-column">
                <div className="d-flex align-items-start mb-3">
                  <div className={`badge ${res.type === 'file' ? 'bg-primary' : 'bg-success'} me-2 fs-6`}>
                    {res.type === 'file' ? '📄 File' : '🌐 Link'}
                  </div>
                </div>
                <h5 className="card-title text-primary mb-3">{res.title}</h5>
                <p className="card-text text-muted flex-grow-1">{res.description}</p>
                <div className="mt-auto">
                  {res.type === 'file' ? (
                    <a href={res.link} className="btn btn-primary w-100" download>
                      <i className="fas fa-download me-2"></i>Download File
                    </a>
                  ) : (
                    <a href={res.link} target="_blank" rel="noreferrer" className="btn btn-success w-100">
                      <i className="fas fa-external-link-alt me-2"></i>Visit Link
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {resources.length === 0 && (
        <div className="text-center py-5">
          <i className="fas fa-book-open fa-3x text-muted mb-3"></i>
          <h4 className="text-muted">No resources available</h4>
          <p className="text-muted">Check back later for new study materials and downloads.</p>
        </div>
      )}
    </div>
  );
}

export default Resources;
