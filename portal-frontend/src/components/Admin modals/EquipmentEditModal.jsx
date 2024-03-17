import React from 'react';
import * as Yup from 'yup';
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

export const EquipmentEditModal = ({ open, handleClose, equipment, onEditEquipment}) => {


  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Įrangos informacija</DialogTitle>
      <Formik
        initialValues={{
          id: equipment.id,
          inventoryNumber: equipment.inventoryNumber,
          name: equipment.name,
          condition: equipment.condition,
          type: equipment.type,
          isAvailable: equipment.isAvailable
        }}

        onSubmit={(values, { setSubmitting }) => {
          onEditEquipment.mutateAsync(values);
          console.log('Form Values:', values);
          setSubmitting(false);
          handleClose();
        }}

        validationSchema={Yup.object().shape({
          name: Yup.string()
            .required('Reikalingas pavadinimas')
            .min(2, 'Pavadinimas turi susidaryti iš bent 2 simbolių'),
          type: Yup.string()
            .required('Reikalingas tipas'),
          inventoryNumber: Yup.number()
            .required('Reikalingas inventoriaus numeris')
            .integer('Inventoriaus numeris turi būti skaičius'),
        })}
      >
        {({ values, handleChange, handleBlur, errors, touched, isSubmitting }) => (
          <Form>
            <DialogContent>
              <Grid container rowSpacing={2} spacing={1}>
                <Grid item xs={2.5} style={{ fontWeight: 'bold' }}>ID:</Grid>
                <Grid item xs={8}>
                  <TextField
                    value={values.id}
                    variant="outlined"
                    fullWidth
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
                <Grid item xs={2.5} style={{ fontWeight: 'bold' }}>Inventoriaus numeris:</Grid>
                <Grid item xs={8}>
                  <TextField
                    name="inventoryNumber"
                    value={values.inventoryNumber}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    variant="outlined"
                    fullWidth
                    error={errors.inventoryNumber && touched.inventoryNumber}
                    helperText={errors.inventoryNumber && touched.inventoryNumber && errors.inventoryNumber}
                  />
                </Grid>
                
                {/* Type Field */}
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
                <Grid item xs={2.5} style={{ fontWeight: 'bold' }}>Būsena:</Grid>
                <Grid item xs={8}>
                  <TextField
                    name="condition"
                    value={values.condition}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    variant="outlined"
                    fullWidth
                  />
                </Grid>

                {/* Floor Field */}
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