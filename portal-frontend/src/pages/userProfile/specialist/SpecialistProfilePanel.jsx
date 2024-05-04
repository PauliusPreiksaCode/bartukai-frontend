import { Card, Grid } from '@mui/material';
import styles from '../UserProfile.module.css';

export default function SpecialistProfilePanel ({user}) {

  return (
    <>

      <div className='flex flex-row gap-3 justify-center'>
        <div className='flex flex-row justify-center items-center gap-2'>
          <p className='font-sans'>Aprašymas:</p>
        </div>
          <p className='font-sans font-bold'>{user.description}</p>
      </div>

      <div className='flex flex-row gap-3 justify-center'>
        <div className='flex flex-row justify-center items-center gap-2'>
          <p className='font-sans'>Patirtis:</p>
        </div>
          <p className='font-sans font-bold'>{user.experience}</p>
      </div>

      <div className='flex flex-row gap-3 justify-center'>
        <div className='flex flex-row justify-center items-center gap-2'>
          <p className='font-sans'>Išsilavinimas:</p>
        </div>
          <p className='font-sans font-bold'>{user.education}</p>
      </div>

      <div className='flex flex-row gap-3 justify-center'>
        <div className='flex flex-row justify-center items-center gap-2'>
          <p className='font-sans'>Tabelio kodas:</p>
        </div>
          <p className='font-sans font-bold'>{user.agreementId}</p>
      </div>

      <div className='flex flex-row gap-3 justify-center'>
        <div className='flex flex-row justify-center items-center gap-2'>
          <p className='font-sans'>Nuotrauka:</p>
        </div>
          <img 
            src={user.photo} 
            alt="" 
            style={{ width: '150px', height: '150px', objectFit: 'cover' }}
          />
      </div>
    </>
  );
}