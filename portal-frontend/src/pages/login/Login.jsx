import { Button, Card, DialogContent, Grid, TextField } from '@mui/material';
import { useNavigate } from 'react-router';
import { Formik, Form } from 'formik';
import { loginTemplateValidation } from '../../validation/loginTemplate';
import { login } from '../../services/api';
import { UserContext } from '../../services/authProvider'; 
import { useContext } from 'react';

export default function Login() {
  const navigate = useNavigate();
  const user = useContext(UserContext);
  const initialValues = {
    username: '',
    password: '',
  };

  return (
    <>
      <div className='flex flex-col justify-center items-center mt-6'>
        <h1 className='main-header'>Prisijungimo Puslapis</h1>
        <div className='flex flex-row justify-center gap-10 my-5'>
          <button 
           className='bg-black w-[150px] h-[50px] text-white font-semibold rounded-[5%] transition-colors duration-300 hover:text-yellow-500'
           onClick={() => { navigate('/');}}>
            Pagrindinis puslapis
          </button>
        </div>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values) => {
          const response = await login(values);
          
          user.login(response.token, response.refreshToken);

          navigate('/');
        }}
        validationSchema={loginTemplateValidation}
      >
        {({ values, handleChange, handleBlur, errors, touched, isSubmitting }) => (
          <Form className='flex items-center justify-center my-5'>
            <Card className='flex justify-center flex-col items-center' style={{ width: '30%' }}>
              <DialogContent>
                <Grid container rowSpacing={1} spacing={1}>
                  <Grid item xs={12} style={{ fontWeight: 'bold' }}>Prisijungimas vardas:</Grid>
                  <Grid item xs={12}>
                    <TextField
                      name="username"
                      label="Prisijungimo vardas"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      variant="outlined"
                      error={errors.username && touched.username}
                      helperText={errors.username && touched.username && errors.username}
                    />
                  </Grid>
                  <Grid item xs={12} style={{ fontWeight: 'bold' }}>Prisijungimas slaptažodis:</Grid>
                  <Grid item xs={12}>
                    <TextField
                      name="password"
                      type="password"
                      label="Prisijungimo slaptažodis"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      variant="outlined"
                      error={errors.password && touched.password}
                      helperText={errors.password && touched.password && errors.password}
                    />
                  </Grid>
                </Grid>
              </DialogContent>
              <button
                className='bg-black w-[150px] h-[50px] text-white font-semibold rounded-[5%] transition-colors duration-300 hover:text-yellow-500 mb-5 cursor-pointer'
                type="submit" 
                disabled={isSubmitting}
              >
                Prisijungti
              </button>
            </Card>
          </Form>
        )}
      </Formik>
      </div>

    </>
  );
};