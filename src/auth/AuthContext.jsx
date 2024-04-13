import { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // const login = async (username, password) => {
  //   try {
  //     const response = await axios.post('http://localhost:8080/login', {
  //       username,
  //       password,
  //     });

  //     console.log('trying the login endpoint');

  //     if (response.status === 200) {
  //       const userData = response.data;
  //       setUser(userData);
  //       console.log('returning userData', userData);
  //       return userData; // Return user data after successful login
  //     }
  //   } catch (error) {
  //     console.error('Login error:', error);
  //     throw error; // Throw error for unsuccessful login
  //   }
  // };

  const login = async (username, password) => {
    try {
      const response = await axios.post('http://localhost:8080/login', {
        username,
        password,
      });

      console.log('trying the login endpoint');

      if (response.status === 200) {
        const userData = response.data;
        setUser(userData);
        console.log('User data set:', userData);
        console.log('Current user state:', user);
        return userData; // Return user data after successful login
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error; // Throw error for unsuccessful login
    }
  };

  const logout = () => {
    setUser(null); // Clear user state on logout
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
