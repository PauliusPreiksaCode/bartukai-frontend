import { Card, Grid } from '@mui/material';
import styles from '../UserProfile.module.css';

export default function UserProfilePanel ({user}) {

  const loyaltyGroup = {
    0: 'Bartukas',
    1: 'Sidabriukas',
    2: 'Auksiukas',
    3: 'Deimantukas',
  };

  return (
    <>

      <div className='flex flex-row gap-3 justify-center'>
        <div className='flex flex-row justify-center items-center gap-2'>
          <p className='font-sans'>Paskutinė užsakyta paslauga:</p>
        </div>
          <p className='font-sans font-bold'>{user.lastOrderedService ? user.lastOrderedService : '-'}</p>
      </div>

      <div className='flex flex-row gap-3 justify-center'>
        <div className='flex flex-row justify-center items-center gap-2'>
          <p className='font-sans'>Lojalumo lygis:</p>
        </div>
          <p className='font-sans font-bold'>{loyaltyGroup[user.loyaltyGroup]}</p>
      </div>
    </>
    
  );
}