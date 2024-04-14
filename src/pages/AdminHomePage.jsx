import { Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import Navbar from '../components/navbar';

const AdminHomePage = () => {
  const { user } = useAuth();

  if (!user || user.role !== 'ADMIN') {
    // Redirect or handle unauthorized access

    return (
      <div>
        <p>You do not have permission to access this page.</p>
        <Link to='/'>Go back to Login</Link>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className='heading'>
        <h1>Welcome, {user.username}!</h1>
        <p>This is the admin home page.</p>
      </div>
    </div>
  );
};

export default AdminHomePage;
