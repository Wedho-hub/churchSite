/**
 * Entry point of the React application.
 * Sets up ReactDOM rendering with AuthProvider context and Toast notifications.
 */
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./contexts/AuthContext";

// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";

// Custom styles
import "./assets/styles.css";

// Toastify for notifications
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
      <ToastContainer position="top-right" autoClose={3000} />
    </AuthProvider>
  </React.StrictMode>
);
