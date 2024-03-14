import { Button, Card, DialogContent, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { Form, Formik } from 'formik';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { specialistRegisterTemplate } from '../../../validation/specialistRegisterTemplate';
import { register } from '../../../services/api';
import styles from './Form.module.css';

export default function SpecialistRegisterForm({ AccountType }){
  const navigate = useNavigate();

  const initialValues = {
    FirstName: '',
    LastName: '',
    UserName: '',
    Email: '',
    Password: '',
    City: '',
    BirthDate: '',
    Gender: '',
    PhoneNumber: '',
    AccountType: 0,
    Description: '',
    Experience: '',
    Education: '',
  };

  const [ bday, setBday ] = useState(initialValues.BirthDate);
  const [image, setImage] = useState({
    data: null,
    contentType: '',
  });

  const handleImageChange = (event, setFieldValue) => {
    const file = event.currentTarget.files[0];
  
    if (file) {
      const reader = new FileReader();
  
      reader.onload = (event) => {
        if (event.target) {
          const result = event.target.result;
  
          if (result instanceof ArrayBuffer) {
            const binaryData = new Uint8Array(result);
            setImage({
              ...image,
              data: binaryData,
              contentType: file.type,
            });

            setFieldValue('PhotoFile', file);
          }
        }
      };
  
      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values) => {
          values.BirthDate = bday;
          values.AccountType = AccountType;

          const { data, contentType } = image;
          const PhotoFile = data;
          const PhotoFileExtention = contentType;

          const user = {
            LastName: values.LastName,
            Gender: values.Gender,
            AccountType: values.AccountType,
            Education: values.Education,
            Experience: values.Experience,
            City: values.City,
            BirthDate: values.BirthDate,
            PhotoFile,
            PhotoFileExtention,
            UserName: values.UserName,
            PhoneNumber: values.PhoneNumber,
            FirstName: values.FirstName,
            Password: values.Password,
            Email: values.Email,
            Description: values.Description,
          };

          console.log('Register user', user);

          await register(user);
          navigate('/login');
        }}
        validationSchema={specialistRegisterTemplate}
      >
        {({ values, handleChange, handleBlur, errors, touched, isSubmitting, formik, setFieldValue }) => (
          <Card style={{ width: '60%' }}>
            <Form>
              <DialogContent>
                <Grid container className={styles.container}>
                  <Grid item xs={6}>
                    <Grid item xs={12} style={{ fontWeight: 'bold' }}>Vardas:</Grid>
                    <Grid item xs={12}>
                      <TextField
                        className={styles.textFiled}
                        name="FirstName"
                        label="Vardas"
                        value={values.FirstName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        variant="outlined"
                        error={errors.FirstName && touched.FirstName}
                        helperText={errors.FirstName && touched.FirstName && errors.FirstName}
                      />
                    </Grid>
                  </Grid>
                  <Grid item xs={6}>
                    <Grid item xs={12} style={{ fontWeight: 'bold' }}>Pavardė:</Grid>
                    <Grid item xs={12}>
                      <TextField
                        className={styles.textFiled}
                        name="LastName"
                        label="Pavardė"
                        value={values.LastName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        variant="outlined"
                        error={errors.LastName && touched.LastName}
                        helperText={errors.LastName && touched.LastName && errors.LastName}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid container className={styles.container}>
                  <Grid item xs={6}>
                    <Grid item xs={12} style={{ fontWeight: 'bold' }}>Prisijungimo vardas:</Grid>
                    <Grid item xs={12}>
                      <TextField
                        className={styles.textFiled}
                        name="UserName"
                        label="Prisijungimo vardas"
                        value={values.UserName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        variant="outlined"
                        error={errors.UserName && touched.UserName}
                        helperText={errors.UserName && touched.UserName && errors.UserName}
                      />
                    </Grid>
                  </Grid>
                  <Grid item xs={6}>
                    <Grid item xs={12} style={{ fontWeight: 'bold' }}>El. paštas:</Grid>
                    <Grid item xs={12}>
                      <TextField
                        className={styles.textFiled}
                        name="Email"
                        label="Prisijungimo vardas"
                        value={values.Email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        variant="outlined"
                        error={errors.Email && touched.Email}
                        helperText={errors.Email && touched.Email && errors.Email}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid container className={styles.container}>
                  <Grid item xs={6}>
                    <Grid item xs={12} style={{ fontWeight: 'bold' }}>Slaptažodis:</Grid>
                    <Grid item xs={12}>
                      <TextField
                        className={styles.textFiled}
                        name="Password"
                        type="password"
                        label="Prisijungimo slaptažodis"
                        value={values.Password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        variant="outlined"
                        error={errors.Password && touched.Password}
                        helperText={errors.Password && touched.Password && errors.Password}
                      />
                    </Grid>
                  </Grid>
                  <Grid item xs={6}>
                    <Grid item xs={12} style={{ fontWeight: 'bold' }}>Miestas:</Grid>
                    <Grid item xs={12}>
                      <TextField
                        className={styles.textFiled}
                        name="City"
                        label="Miestas"
                        value={values.City}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        variant="outlined"
                        error={errors.City && touched.City}
                        helperText={errors.City && touched.City && errors.City}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid container xs={12} className={styles.container}>
                  <Grid item xs={12} style={{ fontWeight: 'bold' }}>Lytis:</Grid>
                  <Grid item xs={12}>
                    <FormControl variant="outlined" fullWidth>
                      <InputLabel id="Gender">Pasirinkite lytį</InputLabel>
                      <Select
                        className={styles.dropdown}
                        labelId="Gender"
                        name="Gender"
                        value={values.Gender}
                        onChange={handleChange}
                        label="Pasirinkite lytį"
                      >
                        <MenuItem value="0">Vyras</MenuItem>
                        <MenuItem value="1">Moteris</MenuItem>
                        <MenuItem value="2">Kitas</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid container xs={12} className={styles.container}>
                  <Grid item xs={6}>
                    <Grid item xs={12} style={{ fontWeight: 'bold' }}> Gimimo data: </Grid>
                    <Grid item xs={12}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          className={styles.textFiled}
                          name="BirthDate"
                          label="Pasirinkite gimimo datą"
                          value={bday}
                          onChange={(newValue) => setBday(newValue)}
                        />
                      </LocalizationProvider>
                    </Grid>
                  </Grid>
                  <Grid item xs={6}>
                    <Grid item xs={12} style={{ fontWeight: 'bold' }}>Telefono numeris:</Grid>
                    <Grid item xs={12}>
                      <TextField
                        className={styles.textFiled}
                        name="PhoneNumber"
                        label="Telefono numeris"
                        value={values.PhoneNumber}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        variant="outlined"
                        error={errors.PhoneNumber && touched.PhoneNumber}
                        helperText={errors.PhoneNumber && touched.PhoneNumber && errors.PhoneNumber}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid container xs={12} className={styles.container}>
                  <Grid item xs={6}>
                    <Grid item xs={12} style={{ fontWeight: 'bold' }}> Nuotrauka: </Grid>
                    <Grid item xs={12}>
                      <input
                        type="file"
                        name="Photo"
                        accept="image/*"
                        onChange={(event) => handleImageChange(event, setFieldValue)}
                      />
                      {errors.PhotoFile && touched.PhotoFile && (
                        <div style={{ color: 'red' }}>{errors.PhotoFile}</div>
                      )}
                    </Grid>
                  </Grid>
                  <Grid item xs={6}>
                    <Grid item xs={12} style={{ fontWeight: 'bold' }}>Aprašymas:</Grid>
                    <Grid item xs={12}>
                      <TextField
                        className={styles.textFiled}
                        name="Description"
                        label="Aprašymas"
                        value={values.Description}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        variant="outlined"
                        error={errors.Description && touched.Description}
                        helperText={errors.Description && touched.Description && errors.Description}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid container xs={12} className={styles.container}>
                  <Grid item xs={6}>
                    <Grid item xs={12} style={{ fontWeight: 'bold' }}>Išsimokslinimas:</Grid>
                    <Grid item xs={12}>
                      <TextField
                        className={styles.textFiled}
                        name="Education"
                        label="Išsimokslinimas"
                        value={values.Education}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        variant="outlined"
                        error={errors.Education && touched.Education}
                        helperText={errors.Education && touched.Education && errors.Education}
                      />
                    </Grid>
                  </Grid>
                  <Grid item xs={6}>
                    <Grid item xs={12} style={{ fontWeight: 'bold' }}>Patirtis:</Grid>
                    <Grid item xs={12}>
                      <TextField
                        className={styles.textFiled}
                        name="Experience"
                        label="Patirtis"
                        value={values.Experience}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        variant="outlined"
                        error={errors.Experience && touched.Experience}
                        helperText={errors.Experience && touched.Experience && errors.Experience}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Button 
                  className={styles.submitbutton}
                  type="submit" 
                  variant="contained" 
                  disabled={isSubmitting}
                >
                  Registruotis
                </Button>
              </DialogContent>
            </Form>
          </Card>
        )}
      </Formik>
    </>
  );
};