// import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

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
      <div>
        <nav className='nav-bar'>
          <ul>
            <li>
              <Link to='/admin'>Home</Link>{' '}
            </li>
            <li>
              <Link to='/admin/users'>Users</Link>{' '}
            </li>
            <li>
              <Link to='/admin/books'>Books</Link>{' '}
            </li>
            <li>
              <Link to='/admin/authors'>Authors</Link>{' '}
            </li>
          </ul>
        </nav>
      </div>
      <div className='heading'>
        <h1>Welcome, {user.username}!</h1>
        <p>This is the admin home page.</p>
      </div>
    </div>
  );
};

export default AdminHomePage;
