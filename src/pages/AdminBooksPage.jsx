import { useEffect } from 'react';
import { useAuth } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminBooksPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login page if user data is not available
    if (!user) {
      navigate('/');
    } else if (user.role !== 'ADMIN') {
      // Redirect to login page if user is not an admin
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <div>
      <h1>Admin Books Page</h1>
      {user && <p>Welcome, {user.username}!</p>}
    </div>
  );
};

export default AdminBooksPage;
