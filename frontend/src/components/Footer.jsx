/**
 * Footer component
 * Improved for modern look, spacing, and accessibility.
 */
function Footer() {
  return (
    <footer className="bg-dark text-white text-center py-4 mt-5 border-top shadow-sm">
      <div className="container">
        <div className="d-flex flex-column flex-md-row align-items-center justify-content-between gap-2">
          <div className="fw-semibold">
            &copy; {new Date().getFullYear()} Inkosiyeza SDA Church
          </div>
          <div>
            <small className="text-secondary">
              Powered by{' '}
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="text-warning fw-bold text-decoration-underline"
                aria-label="Visit Tishbite Digital on GitHub"
              >
                Tishbite Digital
              </a>
            </small>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
