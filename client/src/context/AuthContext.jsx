import React, { createContext, useContext, useState, useEffect } from 'react';
import { api, setAuthToken, clearAuthToken, getAuthToken } from '../utils/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [personas, setPersonas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const personasRes = await api.getPersonas();
        if (personasRes?.personas) {
          setPersonas(personasRes.personas);
        }

        const token = getAuthToken();
        if (token) {
          try {
            const meRes = await api.getCurrentUser();
            if (meRes?.user) {
              setUser(meRes.user);
            }
          } catch (e) {
            clearAuthToken();
          }
        } else if (personasRes?.personas?.length > 0) {
          // Default to first demo persona for immediate friction-free usability
          const defaultPersona = personasRes.personas[0];
          const demoRes = await api.demoLogin(defaultPersona.id);
          if (demoRes?.token) {
            setAuthToken(demoRes.token);
            setUser(demoRes.user);
          }
        }
      } catch (err) {
        console.error('Auth initialization error:', err);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const handleDemoLogin = async (personaId) => {
    setLoading(true);
    try {
      const res = await api.demoLogin(personaId);
      if (res?.token) {
        setAuthToken(res.token);
        setUser(res.user);
        setShowAuthModal(false);
        return { success: true, user: res.user };
      }
    } catch (err) {
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (email, password) => {
    setLoading(true);
    try {
      const res = await api.login({ email, password });
      if (res?.token) {
        setAuthToken(res.token);
        setUser(res.user);
        setShowAuthModal(false);
        return { success: true, user: res.user };
      }
    } catch (err) {
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (name, email, password, role) => {
    setLoading(true);
    try {
      const res = await api.register({ name, email, password, role });
      if (res?.token) {
        setAuthToken(res.token);
        setUser(res.user);
        setShowAuthModal(false);
        return { success: true, user: res.user };
      }
    } catch (err) {
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    clearAuthToken();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        personas,
        loading,
        showAuthModal,
        setShowAuthModal,
        demoLogin: handleDemoLogin,
        login: handleLogin,
        register: handleRegister,
        logout: handleLogout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
