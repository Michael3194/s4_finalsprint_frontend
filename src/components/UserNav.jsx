import { Link } from 'react-router-dom';
import LogoutButton from './LogoutButton';

const UserNav = () => {
  return (
    <div className='user-nav'>
      <nav>
        <ul>
          <li>
            <Link to='/user'>Home</Link>{' '}
          </li>

          <li>
            <LogoutButton />
          </li>
        </ul>
      </nav>
    </div>
  );
};
export default UserNav;
