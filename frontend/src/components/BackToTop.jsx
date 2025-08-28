import { useEffect, useState } from 'react';

function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 200);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      className={`back-to-top-btn btn btn-primary shadow ${visible ? 'show' : ''}`}
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        zIndex: 9999,
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
        transition: 'opacity 0.3s',
        borderRadius: '50%',
        width: '48px',
        height: '48px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.5rem',
      }}
      aria-label="Back to top"
      onClick={scrollToTop}
    >
      <i className="fas fa-arrow-up"></i>
    </button>
  );
}

export default BackToTop;
