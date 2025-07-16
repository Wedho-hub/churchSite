/**
 * Main entry point for the React application.
 * Sets up the root component with necessary providers and global styles.
 * Includes Bootstrap, Font Awesome, custom styles, and toast notifications.
 */

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./contexts/AuthContext";

// Bootstrap CSS for responsive design and components
import "bootstrap/dist/css/bootstrap.min.css";

// Font Awesome for icons (CDN link added to index.html)
// If you prefer npm package, install: npm install @fortawesome/fontawesome-free
// Then import: import "@fortawesome/fontawesome-free/css/all.min.css";

// Custom styles - must come after Bootstrap to override defaults
import "./assets/styles.css";

// Toastify for notifications
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Create root and render the application
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
      {/* Toast notification container with custom positioning */}
      <ToastContainer 
        position="top-right" 
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </AuthProvider>
  </React.StrictMode>
);
