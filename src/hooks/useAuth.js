import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { registerUnauthorizedCallback } from '../api/apiClient';

/**
 * Hook per gestire autenticazione utente
 */
export function useAuth() {
  const [user, setUser] = useState(null);

  // Carica utente da token salvato
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser({
          username: decoded.username,
          role: decoded.role,
          token,
        });
      } catch {
        localStorage.removeItem("token");
      }
    }
  }, []);

  // Registra callback per logout automatico
  useEffect(() => {
    registerUnauthorizedCallback(() => {
      handleLogout();
    });
  }, []);

  const handleLogin = () => {
    const token = localStorage.getItem("token");
    const decoded = jwtDecode(token);
    setUser({
      username: decoded.username,
      role: decoded.role,
      token,
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return {
    user,
    handleLogin,
    handleLogout
  };
}