import React from 'react';
import { Formik, Form } from 'formik';
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Grid,
  TextField
} from '@mui/material';
import { createRoomTemplateValidation } from '../../../validation/createRoomTemplate';

export const RoomCreateModal = ({ open, handleClose, onCreateRoom}) => {


  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Patalpos informacija</DialogTitle>
      <Formik
        initialValues={{
          name: '',
          type: '',
          floor: '',
          accommodates: '',
          description: '',
          isAvailable: true
        }}
        onSubmit={(values, { setSubmitting }) => {
          onCreateRoom.mutateAsync(values); 
          setSubmitting(false);
          handleClose();
        }}
        validationSchema={createRoomTemplateValidation}
      >
        {({ values, handleChange, handleBlur, errors, touched, isSubmitting }) => (
          <Form>
            <DialogContent>
              <Grid container rowSpacing={2} spacing={1}>
                <Grid item xs={2.5} style={{ fontWeight: 'bold' }}>Pavadinimas:</Grid>
                <Grid item xs={8}>
                  <TextField
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    variant="outlined"
                    fullWidth
                    error={errors.name && touched.name}
                    helperText={errors.name && touched.name && errors.name}
                  />
                </Grid>
                
                {/* Type Field */}
                <Grid item xs={2.5} style={{ fontWeight: 'bold' }}>Tipas:</Grid>
                <Grid item xs={8}>
                  <TextField
                    name="type"
                    value={values.type}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    variant="outlined"
                    fullWidth
                    error={errors.type && touched.type}
                    helperText={errors.type && touched.type && errors.type}
                  />
                </Grid>

                {/* Floor Field */}
                <Grid item xs={2.5} style={{ fontWeight: 'bold' }}>Aukštas:</Grid>
                <Grid item xs={8}>
                  <TextField
                    name="floor"
                    value={values.floor}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    variant="outlined"
                    fullWidth
                    error={errors.floor && touched.floor}
                    helperText={errors.floor && touched.floor && errors.floor}
                  />
                </Grid>

                {/* Accommodates Field */}
                <Grid item xs={2.5} style={{ fontWeight: 'bold' }}>Talpinama žmonių:</Grid>
                <Grid item xs={8}>
                  <TextField
                    name="accommodates"
                    value={values.accommodates}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    variant="outlined"
                    fullWidth
                    error={errors.accommodates && touched.accommodates}
                    helperText={errors.accommodates && touched.accommodates && errors.accommodates}
                  />
                </Grid>

                {/* Description Field */}
                <Grid item xs={2.5} style={{ fontWeight: 'bold' }}>Patalpos aprašymas:</Grid>
                <Grid item xs={8}>
                  <TextField
                    name="description"
                    value={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={4}
                    error={errors.description && touched.description}
                    helperText={errors.description && touched.description && errors.description}
                  />
                </Grid>

                {/* isAvailable Checkbox */}
                <Grid item xs={2.5} style={{ fontWeight: 'bold' }}>Teikiama:</Grid>
                <Grid item xs={8}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="isAvailable"
                        checked={values.isAvailable}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    }
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button 
                variant="contained" 
                onClick={handleClose}
              >
                Uždaryti
              </Button>
              <Button 
                type="submit" 
                variant="contained" 
                color="success"
                disabled={isSubmitting}
              >
                Saugoti
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};