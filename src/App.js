import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './auth/AuthContext';
import LoginPage from './pages/LoginPage';
import AdminHomePage from './pages/AdminHomePage';
import AdminBooksPage from './pages/AdminBooksPage';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route
            path='/'
            element={<LoginPage />}
          />
          <Route
            path='/admin'
            element={<AdminHomePage />}
          />
          <Route
            path='/admin/books'
            element={<AdminBooksPage />}
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
