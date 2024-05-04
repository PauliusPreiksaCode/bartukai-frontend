import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Button,
  Card
} from '@mui/material';
import styles from './UserProfile.module.css';
import { UserContext } from '../../services/authProvider';
import SpecialistProfilePanel from './specialist/SpecialistProfilePanel';
import AdminProfilePanel from './admin/AdminProfilePanel';
import UserProfilePanel from './user/UserProfilePanel';
import { useGetUser } from '../../hooks/user';
import { SpecialistProfileEditModal } from './specialist/SpecialistProfileEditModal';
import { UserProfileEditModal } from './user/UserProfileEditModal';
import { ProfileRemoveModal } from './components/ProfileRemoveModal';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Gender = {
  0: 'Vyras',
  1: 'Moteris',
  2: 'Kita'
};

const UserProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showProfileEditModal, setShowProfileEditModal] = useState(false);
  const [showProfileRemoveModal, setShowProfileRemoveModal] = useState(false);

  const userContext = useContext(UserContext);


  const { data, isLoading, isFetching} = useGetUser();
  useEffect(() => {
    setUser(data || null);
  }, [data]);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleProfileEditClick = () => {
    setShowProfileEditModal(true);
  };

  const handleProfileEditModalClose = () => {
    setShowProfileEditModal(false);
  };

  const handleProfileRemoveClick = () => {
    setShowProfileRemoveModal(true);
  };

  const handleProfileRemoveModalClose = () => {
    setShowProfileRemoveModal(false);
  };


  return (
    <>

        <h1 className='main-header mt-6'>Naudotojo paskyros informacija</h1>
        <div className='flex flex-row justify-center gap-10'>
          <button 
           className='bg-black w-[200px] h-[50px] text-white font-semibold rounded-[5%] transition-colors duration-300 hover:text-yellow-500'
           onClick={() => { navigate('/');}}>
            Pagrindinis puslapis
          </button>
        </div>

      {user &&
        <>
          <div className='flex flex-col w-full items-center'>
          <div className='flex flex-col w-11/12 sm:w-3/5 md:w-2/5 my-6 py-6 gap-8 items-center bg-stone-300 border-2 border-gray-800 rounded-lg shadow-lg shadow-inner'>

            <div className='flex flex-col items-center justify-center'>
              <FontAwesomeIcon icon={faCircleUser} className='text-9xl text-gray-800 ' />
            </div>

            <div className='flex flex-col w-full items-center justify-center gap-5 mb-5'>

              <div className='flex flex-row w-full gap-3 justify-center'>
                <div className='flex flex-row justify-center items-center gap-2'>
                <p className='font-sans'>Vardas:</p>
                </div>
                <p className='font-sans font-bold'>{user.firstName}</p>
              </div>

              <div className='flex flex-row w-full gap-3 justify-center'>
                <div className='flex flex-row justify-center items-center gap-2'>
                <p className='font-sans'>Pavardė:</p>
                </div>
                <p className='font-sans font-bold'>{user.lastName}</p>
              </div>

              <div className='flex flex-row gap-3 justify-center w-full'>
                <div className='flex flex-row justify-center items-center gap-2'>
                <p className='font-sans'>Vartotojo vardas:</p>
                </div>
                <p className='font-sans font-bold'>{user.userName}</p>
              </div>


              <div className='flex flex-row gap-3 justify-center'>
                <div className='flex flex-row justify-center items-center gap-2'>
                  <p className='font-sans'>El. pašto adresas:</p>
                </div>
                  <p className='font-sans font-bold'>{user.email}</p>
              </div>

              <div className='flex flex-row gap-3 justify-center'>
                <div className='flex flex-row justify-center items-center gap-2'>
                  <p className='font-sans'>Miestas:</p>
                </div>
                  <p className='font-sans font-bold'>{user.city}</p>
              </div>

              <div className='flex flex-row gap-3 justify-center'>
                <div className='flex flex-row justify-center items-center gap-2'>
                  <p className='font-sans'>Gimimo data:</p>
                </div>
                  <p className='font-sans font-bold'>{user.birthDate.slice(0, 10)}</p>
              </div>

              <div className='flex flex-row gap-3 justify-center'>
                <div className='flex flex-row justify-center items-center gap-2'>
                  <p className='font-sans'>Lytis:</p>
                </div>
                  <p className='font-sans font-bold'>{Gender[user.gender]}</p>
              </div>

              <div className='flex flex-row gap-3 justify-center'>
                <div className='flex flex-row justify-center items-center gap-2'>
                  <p className='font-sans'>Telefono numeris:</p>
                </div>
                  <p className='font-sans font-bold'>{user.phoneNumber}</p>
              </div>

              <div className='flex flex-row gap-3 justify-center'>
                <div className='flex flex-row justify-center items-center gap-2'>
                  <p className='font-sans'>Paskyros sukūrimo data:</p>
                </div>
                  <p className='font-sans font-bold'>{user.creationTime.slice(0, 10)}</p>
              </div>

              {userContext.user?.decodedJwt?.role === '0' && (
                <AdminProfilePanel user={user} />
              )}
              {userContext.user?.decodedJwt?.role === '1' && (
                  <UserProfilePanel user={user} />
              )}
              {userContext.user?.decodedJwt?.role === '2' && (
                  <SpecialistProfilePanel user={user} />
              )}

            </div>
            
              <div className='flex flex-col md:flex-row gap-3 justify-center items-center'>

                <button 
                  className='bg-blue-700 px-6 py-3 text-white font-semibold border-2 border-black w-[190px]'
                  onClick={handleProfileEditClick}>
                  Redaguoti paskyrą
                </button>

                <button 
                  className='bg-red-700 px-6 py-3 text-white font-semibold border-2 border-black w-[190px]'
                  onClick={handleProfileRemoveClick}>
                  Trinti paskyrą
                </button>

              </div>
            </div>
          </div>

          {showProfileEditModal && userContext.user?.decodedJwt?.role === '2' && (
                <SpecialistProfileEditModal
                open={showProfileEditModal}
                handleClose={handleProfileEditModalClose}
                user={user}
                />
            )}
            {showProfileEditModal && userContext.user?.decodedJwt?.role !== '2' && (
                <UserProfileEditModal
                open={showProfileEditModal}
                handleClose={handleProfileEditModalClose}
                user={user}
                userContext={userContext}
                />
            )}
            {showProfileRemoveModal && (
                <ProfileRemoveModal
                open={showProfileRemoveModal}
                handleClose={handleProfileRemoveModalClose}
                user={user}
                />
            )}

        </>
      }
    </>
  );
};

export default UserProfile;