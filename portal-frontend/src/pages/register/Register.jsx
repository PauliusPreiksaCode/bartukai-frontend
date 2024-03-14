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
      <h1>Registracijos puslapis</h1>
      <Button variant="contained" onClick={() => { navigate(-1);}}>Atgal</Button>
      <Button variant="contained" onClick={() => { navigate('/login');}}>Prisijungti</Button>
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