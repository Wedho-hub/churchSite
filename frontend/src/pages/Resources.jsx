import { useEffect, useState } from 'react';
import axios from 'axios';

function Resources() {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    axios.get('/api/resources')
      .then(res => setResources(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">📚 Study Resources & Downloads</h2>

      <div className="row">
        {resources.map((res) => (
          <div key={res._id} className="col-md-6 mb-3">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{res.title}</h5>
                <p className="card-text">{res.description}</p>

                {res.type === 'file' ? (
                  <a href={res.link} className="btn btn-outline-primary" download>
                    📄 Download File
                  </a>
                ) : (
                  <a href={res.link} target="_blank" rel="noreferrer" className="btn btn-outline-success">
                    🌐 Visit Link
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Resources;
