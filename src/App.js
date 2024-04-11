import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import AdminHomePage from './pages/AdminHomePage';

function App() {
  return (
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
      </Routes>
    </Router>
  );
}

export default App;
