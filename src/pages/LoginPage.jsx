import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/login', {
        username,
        password,
      });
      console.log('Trying to login');

      if (response.status === 200) {
        console.log('Login status 200');
        const user = response.data;
        if (user.role === 'ADMIN') {
          // Redirect to AdminHomePage
          console.log('Redirecting to admin page');
          navigate('/admin');
        } else {
          // Redirect to normal user page
          // navigate('/user'); // Example route for normal user page
        }
      } else {
        console.log(' Error in login status 200');
        setError('Login failed');
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
