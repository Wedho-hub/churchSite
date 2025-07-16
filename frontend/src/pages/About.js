import React, { useEffect, useState } from 'react';
import axios from 'axios';

function About() {
  const [about, setAbout] = useState(null);
  const [sabbath, setSabbath] = useState(null);
  const [timeLeft, setTimeLeft] = useState('');

  // 🌍 Load content from DB
  useEffect(() => {
    axios.get('/api/content/about').then(res => setAbout(res.data));
    axios.get('/api/content/sabbath').then(res => setSabbath(res.data));
  }, []);

  // ⏳ Countdown logic
  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const nextSabbath = new Date();

      nextSabbath.setDate(now.getDate() + ((6 - now.getDay() + 7) % 7)); // Saturday
      nextSabbath.setHours(18, 0, 0, 0); // 6 PM Sabbath start

      const diff = nextSabbath - now;
      if (diff <= 0) return setTimeLeft('Sabbath is here! 🎉');

      const hrs = Math.floor(diff / 1000 / 60 / 60);
      const mins = Math.floor((diff / 1000 / 60) % 60);
      const secs = Math.floor((diff / 1000) % 60);

      setTimeLeft(`${hrs}h ${mins}m ${secs}s`);
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!about || !sabbath) return <div className="container mt-4">Loading...</div>;

  return (
    <div className="container mt-5">
      <h1 className="mb-3 text-success">{about.title}</h1>
      <p className="lead" style={{ whiteSpace: 'pre-line' }}>{about.body}</p>

      <hr />

      <h3 className="text-primary mt-4">{sabbath.title}</h3>
      <p style={{ whiteSpace: 'pre-line' }}>{sabbath.body}</p>

      <div className="my-4">
        <h5 className="text-muted">⏳ Time left until next Sabbath (Friday sunset):</h5>
        <div className="fs-4 fw-bold">{timeLeft}</div>
      </div>

      <hr />

      <p>
        For more on our beliefs, visit the official&nbsp;
        <a href="https://www.adventist.org" target="_blank" rel="noopener noreferrer">
          Seventh-day Adventist Church website 🌍
        </a>.
      </p>
    </div>
  );
}

export default About;
