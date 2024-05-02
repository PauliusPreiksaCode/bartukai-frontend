import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from '@mui/material';

export const ServiceViewGeneralModal = ({ open, handleClose, service}) => {

  const serviceLocation = {
    0: 'Verslo centras',
    1: 'Specialisto privati patalpa',
    2: 'Virtualus',
  };

  const gender = {
    0: 'Vyras',
    1: 'Moteris',
    2: 'Kita',
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth={'xl'}>
      <DialogTitle>Paslaugos informacija</DialogTitle>
      <DialogContent>
        <Grid container rowSpacing={2} spacing={1}>
          <Grid item container xs={6} rowSpacing={2} spacing={1}>
            <Grid item container xs={12}>
              <Grid item xs={5} style={{ fontWeight: 'bold' }}>
              Pavadinimas:
              </Grid>
              <Grid item xs={7}>
                {service.name}
              </Grid>
            </Grid>
            <Grid item container xs={12}>
              <Grid item xs={5} style={{ fontWeight: 'bold' }}>
            Aprašymas:
              </Grid>
              <Grid item xs={7}>
                {service.description}
              </Grid>
            </Grid>
            <Grid item container xs={12}>
              <Grid item xs={5} style={{ fontWeight: 'bold' }}>
              Kaina:
              </Grid>
              <Grid item xs={7}>
                {service.price} €
              </Grid>
            </Grid>
            <Grid item container xs={12}>
              <Grid item xs={5} style={{ fontWeight: 'bold' }}>
            Paslaugos teikimo vieta:
              </Grid>
              <Grid item xs={7}>
                {serviceLocation[service.serviceLocation]}
              </Grid>
            </Grid>
            {service.serviceLocation === 1 ? (
              <Grid item container xs={12}>
                <Grid item xs={5} style={{ fontWeight: 'bold' }}>
            Papildoma vietos informacija:
                </Grid>
                <Grid item xs={7}>
                  <div>
                    {service.address}
                  </div>
                  <div>
                    {service.addressDescription}
                  </div>
                </Grid>
              </Grid>
            ) : null}
            <Grid item container xs={12}>
              <Grid item xs={5} style={{ fontWeight: 'bold' }}>
            Kategorijos:
              </Grid>
              <Grid item xs={7}>
                {service.serviceCategories.map(category => category.name).join(', ')}
              </Grid>
            </Grid>
          </Grid>
          <Grid item container xs={6} rowSpacing={2} spacing={1}>
            <Grid item container xs={12}>
              <Grid item xs={5} style={{ fontWeight: 'bold' }}>
              Specialisto vardas:
              </Grid>
              <Grid item xs={7}>
                {service.specialist.user.firstName}
              </Grid>
            </Grid>
            <Grid item container xs={12}>
              <Grid item xs={5} style={{ fontWeight: 'bold' }}>
              Specialisto pavardė:
              </Grid>
              <Grid item xs={7}>
                {service.specialist.user.lastName}
              </Grid>
            </Grid>
            <Grid item container xs={12}>
              <Grid item xs={5} style={{ fontWeight: 'bold' }}>
              Specialisto aprašas:
              </Grid>
              <Grid item xs={7}>
                {service.specialist.description}
              </Grid>
            </Grid>
            <Grid item container xs={12}>
              <Grid item xs={5} style={{ fontWeight: 'bold' }}>
              Specialisto išsilavinimas:
              </Grid>
              <Grid item xs={7}>
                {service.specialist.education}
              </Grid>
            </Grid>
            <Grid item container xs={12}>
              <Grid item xs={5} style={{ fontWeight: 'bold' }}>
              Specialisto kontaktai:
              </Grid>
              <Grid item xs={7}>
                <div>
                  {service.specialist.user.email}
                </div>
                <div>
                  {service.specialist.user.phoneNumber}
                </div>
              </Grid>
            </Grid>
            <Grid item container xs={12}>
              <Grid item xs={5} style={{ fontWeight: 'bold' }}>
              Specialisto lytis:
              </Grid>
              <Grid item xs={7}>
                {gender[service.specialist.user.gender]}
              </Grid>
            </Grid>
            <Grid item container xs={12}>
              <Grid item xs={5} style={{ fontWeight: 'bold' }}>
              Specialisto nuotrauka:
              </Grid>
              <Grid item xs={7}>
                <img 
                  src={service.specialist.photo} 
                  alt="" 
                  style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleClose}>Uždaryti</Button>
      </DialogActions>
    </Dialog>
  );
};