import { useEffect, useState } from 'react';
import axios from 'axios';

function Bulletins() {
  const [bulletins, setBulletins] = useState([]);

  useEffect(() => {
    axios.get('/api/bulletins')
      .then(res => setBulletins(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">📢 Church Announcements & Bulletins</h2>

      {bulletins.length === 0 && (
        <div className="alert alert-info">No bulletins uploaded yet.</div>
      )}

      <div className="accordion" id="bulletinAccordion">
        {bulletins.map((b, i) => (
          <div key={b._id} className="accordion-item mb-2 shadow-sm">
            <h2 className="accordion-header" id={`heading${i}`}>
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#collapse${i}`}
              >
                📝 {b.title}
              </button>
            </h2>
            <div
              id={`collapse${i}`}
              className="accordion-collapse collapse"
              data-bs-parent="#bulletinAccordion"
            >
              <div className="accordion-body">
                <p>{b.description}</p>
                {b.file && (
                  <a
                    href={b.file}
                    className="btn btn-outline-primary btn-sm"
                    target="_blank"
                    rel="noreferrer"
                  >
                    📄 View/Download
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

export default Bulletins;
