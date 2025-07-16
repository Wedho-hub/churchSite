import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");
  const [admin, setAdmin] = useState(null); // optional: store admin info

  // Save token in local storage
useEffect(() => {
  if (token) {
    localStorage.setItem("token", token);
    const savedAdmin = localStorage.getItem("admin");
    if (savedAdmin) setAdmin(JSON.parse(savedAdmin));
  } else {
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
  }
}, [token]);

const login = (newToken, adminData) => {
  setToken(newToken);
  setAdmin(adminData);
  localStorage.setItem("admin", JSON.stringify(adminData));
};

const logout = () => {
  setToken("");
  setAdmin(null);
  localStorage.removeItem("token");
  localStorage.removeItem("admin");
};

  return (
    <AuthContext.Provider value={{ token, admin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
