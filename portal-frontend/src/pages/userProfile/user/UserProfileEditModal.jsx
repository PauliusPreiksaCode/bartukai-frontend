import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import {
  Button,
  Dialog,
  Card,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
  DialogContent,
  DialogTitle,
  Grid,
  TextField
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { userEditTemplate } from '../../../validation/userEditTemplate';
import { useEditUser } from '../../../hooks/user';
import styles from '../UserProfile.module.css';
import dayjs from 'dayjs';

export const UserProfileEditModal = ({ open, handleClose, user, userContext}) => {

  const editUser = useEditUser();

  const initialValues = {
    FirstName: user.firstName,
    LastName: user.lastName,
    UserName: user.userName,
    Email: user.email,
    City: user.city,
    BirthDate: dayjs(user.birthDate.slice(0, 10)),
    Gender: user.gender,
    PhoneNumber: user.phoneNumber,
    AccountType: userContext.user?.decodedJwt?.role,
    Description: user.description,
    Experience: user.experience,
    Education: user.education,
  };

  const [ bday, setBday ] = useState(initialValues.BirthDate);
  const image ={
    data: '',
    contentType: '',
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle className={styles.title}>Naudotojo informacija</DialogTitle>
      <Formik
        initialValues={initialValues}

        onSubmit={(values, { setSubmitting }) => {
          values.BirthDate = bday;

          const { data, contentType } = image;
          const PhotoFile = data;
          const PhotoFileExtention = contentType;

          const user = {
            LastName: values.LastName,
            Gender: values.Gender,
            AccountType: initialValues.AccountType,
            Education: values.Education,
            Experience: values.Experience,
            City: values.City,
            BirthDate: values.BirthDate.add(1, 'day'),
            PhotoFile,
            PhotoFileExtention,
            UserName: values.UserName,
            PhoneNumber: values.PhoneNumber,
            FirstName: values.FirstName,
            Password: values.Password,
            Email: values.Email,
            Description: values.Description,
          };

          editUser.mutateAsync(user);
          setSubmitting(false);
          handleClose();
        }}

        validationSchema={userEditTemplate}
      >
        {({ values, handleChange, handleBlur, errors, touched, isSubmitting, setFieldValue }) => (
          <Card className={styles.card}>
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
                  <Grid item xs={6}>
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
                </Grid>
                <Grid container className={styles.container}>
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
                <Grid container style={{marginTop: '20px'}}>
                  <Grid item xs={6} >
                    <Button 
                      className={styles.submitbutton}
                      type="submit" 
                      variant="contained" 
                      disabled={isSubmitting}
                    >
                Atnaujinti
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button 
                      className={styles.submitbutton}
                      variant="contained" 
                      onClick={handleClose}
                    >
                Uždaryti
                    </Button>
                  </Grid>
                </Grid>
              </DialogContent>
            </Form>
          </Card>
        )}
      </Formik>
    </Dialog>
  );
};