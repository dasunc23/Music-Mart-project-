import React, { useEffect, useState, createContext, useContext } from 'react';
import axios from 'axios';

// Replace with your backend base URL if needed
const API = 'http://localhost:5000'; // or wherever your backend runs

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('token') || '');

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedToken = localStorage.getItem('token');

    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser));
      setToken(savedToken);
      axios.defaults.headers.common['Authorization'] = `Bearer ${savedToken}`;
    }
  }, []);

  const login = async (email, password) => {
    try {
      const res = await axios.post(`${API}/api/auth/login`, { email, password });

      const { token, user } = res.data;

      // Save in state
      setUser(user);
      setToken(token);

      // Save in localStorage
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);

      // Set default Authorization header
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      return { success: true, user }; // for redirection after login
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || 'Login failed',
      };
    }
  };

  const register = async (name, email, password) => {
    try {
      const res = await axios.post(`${API}/api/auth/register`, {
        name,
        email,
        password,
      });

      const { token, user } = res.data;

      setUser(user);
      setToken(token);

      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } catch (err) {
      console.error('Registration failed:', err);
    }
  };

  const logout = () => {
    setUser(null);
    setToken('');
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
  };

  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        token,
        login,
        logout,
        register,
        isAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
