import { Button } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import ClientRegisterForm from './components/ClientRegisterForm';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import SpecialistRegisterForm from './components/SpecialistRegisterForm';
import styles from './Register.module.css';

export default function Register() {
  const navigate = useNavigate();

  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked((prevChecked) => !prevChecked);
  };


  return (
    <>
      <div className='flex flex-col justify-center mt-6'>
        <h1 className='main-header'>Registracijos Puslapis</h1>
        <div className='flex flex-row justify-center gap-10 my-5'>
          <button 
           className='bg-black w-[150px] h-[50px] text-white font-semibold rounded-[5%] transition-colors duration-300 hover:text-yellow-500'
           onClick={() => { navigate(-1);}}>
            Atgal
          </button>

          <button
           className='bg-black w-[150px] h-[50px] text-white font-semibold rounded-[5%] transition-colors duration-300 hover:text-yellow-500'
           onClick={() => { navigate('/login');}}>
            Prisijungti
          </button>
        </div>
      </div>

      <div className={styles.formSelector}>
        <FormControlLabel
          control={<Switch checked={checked} onChange={handleChange} />}
          label={checked ? 'Specialistas' : 'Naudotojas' }
        />
      </div>
      <div className={styles.formContainer}>
        { !checked ? (
          <ClientRegisterForm AccountType={1} />
        ) : (
          <SpecialistRegisterForm AccountType={2} />
        )}
      </div>
    </>
  );
};