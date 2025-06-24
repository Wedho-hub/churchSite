import { useEffect, useState } from "react";
import axios from "axios";

function Ministries() {
  const [ministries, setMinistries] = useState([]);

  useEffect(() => {
    axios
      .get("/api/ministries")
      .then((res) => setMinistries(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">🙌🏽 Church Ministries</h2>
      <div className="row">
        {ministries.map((m) => (
          <div key={m._id} className="col-md-6 mb-3">
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body">
                <h5 className="card-title">{m.name}</h5>
                <p className="card-subtitle mb-2 text-muted">
                  👤 Leader: {m.leader}
                </p>

                {m.description && <p className="card-text">{m.description}</p>}

                {m.functions && m.functions.length > 0 && (
                  <>
                    <h6>Key Responsibilities:</h6>
                    <ul className="mb-0">
                      {m.functions.map((f, i) => (
                        <li key={i}>{f}</li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Ministries;
