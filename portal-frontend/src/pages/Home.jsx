import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../services/authProvider';

const Home = () => {
  const navigate = useNavigate();

  const user = useContext(UserContext);

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
  );
};

export default Home;