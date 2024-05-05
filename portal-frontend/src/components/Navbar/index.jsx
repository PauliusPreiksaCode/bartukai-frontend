import React, {useState, useContext} from 'react';
import './styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import {Link, useNavigate} from 'react-router-dom'
import { UserContext } from '../../services/authProvider';

const Navbar = () => {

  const navigate = useNavigate()
  const [showMenu, setShowMenu] = useState(false)

  const userContext = useContext(UserContext);
  const userAccessLevel = userContext?.user?.decodedJwt?.role;

  const toggleMenu = () => {
    setShowMenu(prev => !prev)
  }

  const handleLogoutClick = (event) => {
    userContext.logout();
    navigate('/');
  };


  return (
    <div className='flex justify-between bg-blue-700 w-full px-6 py-3 text-white font-semibold'>
      <div className='flex justify-start items-end'>
        <h2 className='navbar-hdr'>
          <Link to='/'>Verslo Valdymo sistema</Link>
        </h2>
      </div>

      <ul className='lg:flex flex-row items-center gap-8 hidden'>

       {userAccessLevel === undefined && (
        <li className='navbar-ul-item'>
          <Link to="/register">Registruotis</Link>
        </li>
       )}

       {userAccessLevel === undefined && (
        <li className='navbar-ul-item'>
          <Link to="/login">Prisijungti</Link>
        </li>
       )}

        {userAccessLevel === '0' && (
        <li className='navbar-ul-item'>
          <Link to="/admin-panel/rooms">Peržiūrėti patalpas</Link>
        </li>
        )}

        {userAccessLevel === '0' && (
        <li className='navbar-ul-item'>
          <Link to="/admin-panel/equipment">Peržiūrėti įrangą</Link>
        </li>
        )}

        {userAccessLevel === '0' && (
          <li className='navbar-ul-item'>
            <Link to="/admin-panel/services">Peržiūrėti paslaugas</Link>
          </li>
        )}

        {userAccessLevel === '0' && (
          <li className='navbar-ul-item'>
            <Link to="/admin-panel/NonApprovedServices">Nepatvirtintos paslaugas</Link>
          </li>
        )}

        {userAccessLevel === '0' && (
          <li className='navbar-ul-item'>
            <Link to="/admin-panel/orders">Peržiūrėti užsakymus</Link>
          </li>
        )}

        {userAccessLevel === '2' && (
        <li className='navbar-ul-item'>
          <Link to="/specialist-panel/services">Peržiūrėti paslaugas</Link>
        </li>
        )}

        {userAccessLevel === '1' && (
          <li className='navbar-ul-item'>
            <Link to="/services">Peržiūrėti paslaugas</Link>
          </li>
        )}

        {userAccessLevel === '1' && (
          <li className='navbar-ul-item'>
            <Link to="/client-panel/orders">Peržiūrėti užsakymus</Link>
          </li>
        )}

        {userAccessLevel !== undefined && (
          <li className='navbar-ul-item'>
            <Link to="/profile">Profilis</Link>
          </li>
        )}

        {userAccessLevel !== undefined && (
        <li className='navbar-ul-item'>
          <button onClick={handleLogoutClick}>Atsijungti</button>
        </li>
        )}

      </ul>

      <div className='lg:hidden flex items-center justify-end w-1/3'>
        <FontAwesomeIcon icon={faBars} className='navbar-icon' onClick={toggleMenu} />
        {showMenu && (
          <div className='lg:hidden flex flex-column fixed right-5 top-11 bg-white opacity-90 z-50 text-black border border-gray-300 rounded p-4'>
            <ul className='flex flex-col'>

              {userAccessLevel === undefined && (
              <li className='navbar-ul-item'>
                <Link to="/register">Registruotis</Link>
              </li>
              )}

              {userAccessLevel === undefined && (
                <li className='navbar-ul-item'>
                <Link to="/login">Prisijungti</Link>
                </li>
              )}

              {userAccessLevel === '0' && (
              <li className='navbar-ul-item'>
                <Link to="/admin-panel/rooms">Peržiūrėti patalpas</Link>
              </li>
              )}

              {userAccessLevel === '0' && (
              <li className='navbar-ul-item'>
                <Link to="/admin-panel/equipment">Peržiūrėti įrangą</Link>
              </li>
              )}

              {userAccessLevel !== undefined && (
              <li className='navbar-ul-item'>
                <button onClick={handleLogoutClick}>Atsijungti</button>
              </li>
              )}

            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
export default Navbar;