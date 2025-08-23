/**
 * Footer component
 * Displays copyright and developer credit.
 */
function Footer() {
  return (
    <footer className="bg-dark text-white text-center py-3 mt-5">
      <div>&copy; {new Date().getFullYear()} Inkosiyeza SDA Church</div>
      <small>
        Powered by{" "}
        <a
          href="www.linkedin.com/in/wellington-dhliwayo"
          target="_blank"
          rel="noreferrer"
          className="text-warning"
        >
          Tishbite Digital
        </a>
      </small>
    </footer>
  );
}

export default Footer;
