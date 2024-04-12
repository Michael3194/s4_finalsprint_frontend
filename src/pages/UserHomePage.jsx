import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../path/to/AuthContext'; // Update the path

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth(); // Access the login function from AuthContext

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const user = await login(username, password);
      if (user.role === 'ADMIN') {
        navigate('/admin'); // Redirect to /admin if user is ADMIN
      } else {
        navigate('/user'); // Redirect to /user if user is NORMAL
      }
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
