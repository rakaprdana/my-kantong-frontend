import { useState, type ReactNode } from "react";
import { AuthContext } from "../hooks/useAuthContext";

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    return isLoggedIn === "true";
  });

  function login() {
    localStorage.setItem("isLoggedIn", "true");
    setIsAuthenticated(true);
  }

  function logout() {
    localStorage.removeItem("isLoggedIn");
    setIsAuthenticated(false);
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
