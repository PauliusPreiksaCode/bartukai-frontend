import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from '@mui/material';

export const ServiceViewModal = ({ open, handleClose, service}) => {

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

  const paymentType = {
    0: 'Grynieji',
    1: 'Bankine kortele',
  };

  const orderStatus = {
    0: 'Sukurtas',
    1: 'Atšauktas'
  };

  console.log(service);

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
          <Grid item container xs={12} rowSpacing={2} spacing={1}>
            <Grid item container xs={12}>
              <Grid item xs={5} style={{ fontWeight: 'bold', fontSize:'30px'}}>
            Rezervacijos
              </Grid>
            </Grid>
            {service.timeReservations && service.timeReservations.map((reservation, index) => (
              <React.Fragment key={index}>
                <Grid item container xs={12}>
                  <Grid item xs={5} style={{ fontWeight: 'bold' }}>
          Data Nuo:
                  </Grid>
                  <Grid item xs={7}>
                    {reservation.dateFrom.replace('T', ' ').substring(0, reservation.dateFrom.length - 3) || '-'}
                  </Grid>
                </Grid>
                <Grid item container xs={12}>
                  <Grid item xs={5} style={{ fontWeight: 'bold' }}>
          Data Iki:
                  </Grid>
                  <Grid item xs={7}>
                    {reservation.dateTo.replace('T', ' ').substring(0, reservation.dateTo.length - 3) || '-'}
                  </Grid>
                </Grid>
                <Grid item container xs={12}>
                  <Grid item xs={5} style={{ fontWeight: 'bold' }}>
          Patalpa:
                  </Grid>
                  <Grid item xs={7}>
                    {reservation.roomName || '-'}
                  </Grid>
                </Grid>
                <Grid item container xs={12}>
                  <Grid item xs={5} style={{ fontWeight: 'bold' }}>
                    Įranga:
                  </Grid>
                  <Grid item xs={7}>
                    {reservation.equipmentNames?.join(', ') || '-'}
                  </Grid>
                </Grid>
                <Grid item container xs={12}>
                  <Grid item xs={5} style={{ fontWeight: 'bold' }}>
          Kliento Vardas:
                  </Grid>
                  <Grid item xs={7}>
                    {reservation.customerName || '-'}
                  </Grid>
                </Grid>
                <Grid item container xs={12}>
                  <Grid item xs={5} style={{ fontWeight: 'bold' }}>
          Kliento pavardė:
                  </Grid>
                  <Grid item xs={7}>
                    {reservation.customerLastName || '-'}
                  </Grid>
                </Grid>
                <Grid item container xs={12}>
                  <Grid item xs={5} style={{ fontWeight: 'bold' }}>
          Kliento el. paštas:
                  </Grid>
                  <Grid item xs={7}>
                    {reservation.customerEmail || '-'}
                  </Grid>
                </Grid>
                <Grid item container xs={12}>
                  <Grid item xs={5} style={{ fontWeight: 'bold' }}>
          Kliento užsakymo pateikimo data:
                  </Grid>
                  <Grid item xs={7}>
                    {reservation.customerOrderDate?.replace('T', ' ').substring(0, reservation.customerOrderDate.length - 3) || '-'}
                  </Grid>
                </Grid>
                <Grid item container xs={12}>
                  <Grid item xs={5} style={{ fontWeight: 'bold' }}>
          Apmokėjimo būdas:
                  </Grid>
                  <Grid item xs={7}>
                    {paymentType[reservation.paymentType] || '-'}
                  </Grid>
                </Grid>
                <Grid item container xs={12}>
                  <Grid item xs={5} style={{ fontWeight: 'bold' }}>
          Užsakymo statusas:
                  </Grid>
                  <Grid item xs={7}>
                    {orderStatus[reservation.orderStatus] || '-'}
                  </Grid>
                </Grid>
                <Grid item container xs={12}>
                  <Grid item xs={5} style={{ fontWeight: 'bold' }}>
          Užsakymo numeris:
                  </Grid>
                  <Grid item xs={7}>
                    {reservation.orderNumber || '-'}
                  </Grid>
                </Grid>
                {/* ... include other properties as needed ... */}
                <hr style={{ width: '100%', marginTop: '20px', marginBottom: '20px' }} />
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleClose}>Uždaryti</Button>
      </DialogActions>
    </Dialog>
  );
};