import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login, user } = useAuth(); // Access the login function and user data from AuthContext

  useEffect(() => {
    // Redirect based on user's role after the user state has been updated
    if (user && user.role === 'ADMIN') {
      navigate('/admin');
    } else if (user && user.role === 'NORMAL') {
      navigate('/user');
    }
  }, [user, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      console.log('Logging in...');
      await login(username, password);
    } catch (error) {
      console.error('Error:', error);
      setError('Login failed - Please try again');
    }
  };

  return (
    <div className='page'>
      <div className='login-form'>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor='username'>Username:</label>
            <input
              type='text'
              id='username'
              name='username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor='password'>Password:</label>
            <input
              type='password'
              id='password'
              name='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type='submit'
            className='btn login-btn'
          >
            Login
          </button>
          {error && <p className='error'>{error}</p>}
        </form>
      </div>
      <h2>Don't have an account?</h2>
      <h3>
        <Link to='/signup'>Sign Up</Link>
      </h3>
    </div>
  );
};

export default LoginPage;
