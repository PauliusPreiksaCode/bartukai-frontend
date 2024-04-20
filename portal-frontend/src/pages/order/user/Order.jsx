import { Button, Card, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import { useState } from 'react';
import { useLocation , useNavigate } from 'react-router-dom';
import styles from './Order.module.css';
import dayjs from 'dayjs';
import { Box } from '@mui/system';
import { useCreateOrder } from '../../../hooks/order';


export default function Order() {
  const location = useLocation();
  const service = location.state?.service;

  const navigate = useNavigate();
  const [ paymentId, setPaymentId ] = useState(0);
  const createOrder = useCreateOrder();

  const currentDate = dayjs();

  const serviceLocation = {
    0: 'Verslo centro patalpos',
    1: 'Privačios specialisto patalpos',
    2: 'Virtualus vizitas',
  };

  const gender = {
    0: 'Vyras',
    1: 'Moteris',
    2: 'Kita',
  };

  const paymentType = {
    0: 'Grynais',
    1: 'Kortele',
  };

  const handleOrder = (id) => {
    const params = {
      'timeReservationId': id,
      'paymentType': parseInt(paymentId)
    };

    createOrder.mutateAsync(params);
    console.log('CREATED');
    navigate('/client-panel/orders');
  };

  console.log(service);


  return (
    <>
      <h1>Užsakymo puslapis</h1>
      <Button variant="contained" onClick={() => { navigate(-1);}}>Grįžti į paslaugas</Button>
      
      <Card className={styles.card} variant="outlined">
        <Grid container rowSpacing={2} spacing={1}>
          <Grid item container xs={6} rowSpacing={2} spacing={1}>
            <Typography className={styles.title1}>Paslaugos informacija</Typography>
            <Grid item container xs={12}>
              <Grid item xs={5} style={{ fontWeight: 'bold' }}>
                Paslauga:
              </Grid>
              <Grid item xs={7}>
                {service.name}
              </Grid>
            </Grid>
            <Grid item container xs={12}>
              <Grid item xs={5} style={{ fontWeight: 'bold' }}>
                Paslaugos aprašas:
              </Grid>
              <Grid item xs={7}>
                {service.description}
              </Grid>
            </Grid>
            <Grid item container xs={12}>
              <Grid item xs={5} style={{ fontWeight: 'bold' }}>
                Paslaugos kaina:
              </Grid>
              <Grid item xs={7}>
                {service.price} €
              </Grid>
            </Grid>
            <Grid item container xs={12}>
              <Grid item xs={5} style={{ fontWeight: 'bold' }}>
                Kategorijos:
              </Grid>
              <Grid item xs={7}>
                {service.serviceCategories.map(category => category.name).join(', ')}
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
          </Grid>
          <Grid item container xs={6} rowSpacing={2} spacing={1}>
            <Grid item container xs={8}>
              <Typography className={styles.title2}>Specialisto informacija</Typography>
              <Grid item container xs={12}>
                <Grid item xs={7.5} style={{ fontWeight: 'bold' }}>
                Specialisto vardas:
                </Grid>
                <Grid item xs={4.5}>
                  {service.specialist.user.firstName}
                </Grid>
              </Grid>
              <Grid item container xs={12}>
                <Grid item xs={7.5} style={{ fontWeight: 'bold' }}>
                Specialisto pavardė:
                </Grid>
                <Grid item xs={4.5}>
                  {service.specialist.user.lastName}
                </Grid>
              </Grid>
              <Grid item container xs={12}>
                <Grid item xs={7.5} style={{ fontWeight: 'bold' }}>
                Specialisto lytis:
                </Grid>
                <Grid item xs={4.5}>
                  {gender[service.specialist.user.gender]}
                </Grid>
              </Grid>
              <Grid item container xs={12}>
                <Grid item xs={7.5} style={{ fontWeight: 'bold' }}>
                Specialisto kontaktai:
                </Grid>
                <Grid item xs={4.5}>
                  <div>
                    {service.specialist.user.email}
                  </div>
                  <div>
                    {service.specialist.user.phoneNumber}
                  </div>
                </Grid>
              </Grid>
            </Grid>
            <Grid item container xs={4}>
              <img
                src={service.specialist.photo}
                alt="Specialisto nuotrauka"
                height={200}
              />
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
                Specialisto patirtis:
              </Grid>
              <Grid item xs={7}>
                {service.specialist.experience}
              </Grid>
            </Grid>
            <Grid item container xs={12}>
              <Grid item xs={5} style={{ fontWeight: 'bold' }}>
                Specialisto išsimokslinimas:
              </Grid>
              <Grid item xs={7}>
                {service.specialist.education}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Card>

      <Typography className={styles.orderSection}>Užsakymo informacija</Typography>

      <div style={{margin: 20}}>
        <Box className={styles.selector}>
          <FormControl fullWidth >
            <InputLabel id="payment-type-select-label">Apmokėjimas</InputLabel>
            <Select
              labelId="payment-type-select-label"
              id="payment-type-select"
              value={paymentId}
              onChange={(e) => setPaymentId(e.target.value)}
              label="Apmokėjimas"
            >
              {Object.entries(paymentType).map(([key, value]) => (
                <MenuItem key={key} value={key}>
                  {value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </div>

      

      {service.timeReservations.map((reservation) => {
        const dateFrom = dayjs(reservation.dateFrom);
        const dateTo = dayjs(reservation.dateTo);
        let location = '';

        if(service.serviceLocation === 0) {
          location = `Paslauga teikiama verslo centro patalpose, kabinete ${reservation.roomId} ${reservation.roomName}`;
        } else if (service.serviceLocation === 1) {
          location = `Paslauga teikiama specialisto patalpose adresu: ${service.address}`;
        } else {
          location = 'Paslauga teikiama virtualiai';
        }
        if (currentDate.isBefore(dateFrom)) {
          return (
            <div style={{marginBottom: 10}} key={reservation.id}>
              <Card className={styles.optionCard} variant="outlined">
                <div className={styles.optionCardContainer}>
                  <span className={styles.optionCardText}>
                    {dateFrom.format('YYYY-MM-DD HH:mm:ss')} - {dateTo.format('YYYY-MM-DD HH:mm:ss')}
                  </span>
                  <span className={styles.optionCardText}>
                    {location} 
                  </span>
                  <Button variant="contained" onClick={() => handleOrder(reservation.id)}>Užsisakyti</Button>
                </div>
              </Card>
            </div>
          );
        } else {
          return null;
        }
      })}
    </>
  );
};