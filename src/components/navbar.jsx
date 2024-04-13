import { Link } from 'react-router-dom';

const navbar = () => {
  return (
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
  );
};
export default navbar;
