import { Card, Grid } from '@mui/material';
import styles from '../UserProfile.module.css';

export default function AdminProfilePanel ({user}) {

  return (
    <div className='flex flex-row gap-3 justify-center'>
      <div className='flex flex-row justify-center items-center gap-2'>
        <p className='font-sans'>Tabelio kodas:</p>
      </div>
        <p className='font-sans font-bold'>{user.workerId}</p>
    </div>
  );
}