import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { UserContext } from '../services/authProvider';

const Home = () => {
  const navigate = useNavigate();

  const user = useContext(UserContext);
  console.log(user.user);

  const handleLoginClick = (event) => {
    navigate('/login');
  };

  const handleRegisterClick = (event) => {
    navigate('/register');
  };

  const handleLogoutClick = (event) => {
    user.logout();
    navigate('/');
  };

  const handleRoomsClick = (event) => {
    navigate('/admin-panel/rooms');
  };

  return (

      <div className='flex flex-row justify-center mt-6'>
        <h1 className='main-header'>Pagrindinis Puslapis</h1>
      </div>

      /* {user.isLoggedIn ? 
        (
          <>
            <Button variant="contained" onClick={handleLogoutClick}>Atsijungti</Button>
          </>
        ) :
        (
          <>
            <Button variant="contained" onClick={handleLoginClick}>Prisijungti</Button>
            <Button variant="contained" onClick={handleRegisterClick}>Registuotis</Button>
            <Button variant="contained" onClick={handleRoomsClick}>Peržiūrėti patalpas</Button>
          </>
        )
      } */

  );
};

export default Home;