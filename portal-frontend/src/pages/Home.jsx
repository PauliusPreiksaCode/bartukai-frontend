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

  return (
    <>
      <h1>Pagrindinis puslapis</h1>

      {user.isLoggedIn ? 
        (
          <>
            <Button variant="contained" onClick={handleLogoutClick}>Atsijungti</Button>
          </>
        ) :
        (
          <>
            <Button variant="contained" onClick={handleLoginClick}>Prisijungti</Button>
            <Button variant="contained" onClick={handleRegisterClick}>Registuotis</Button>
          </>
        )
      }
    </>
  );
};

export default Home;