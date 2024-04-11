const LoginPage = () => {
  return (
    <div class='page'>
      <div class='login-form'>
        <h2>Login</h2>
        <form /*onSubmit={handleSubmit}*/>
          <div>
            <label htmlFor='username'>Username:</label>
            <input
              type='text'
              id='username'
              name='username'
              // value={formData.username}
              // onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor='password'>Password:</label>
            <input
              type='password'
              id='password'
              name='password'
              // value={formData.password}
              // onChange={handleChange}
              required
            />
          </div>
          <button
            type='submit'
            class='btn login-btn'
          >
            Login
          </button>
        </form>
      </div>
      <h2>Don't have an account?</h2>
      <h3>
        <a href='/signup'>Sign Up</a>
      </h3>
    </div>
  );
};

export default LoginPage;
