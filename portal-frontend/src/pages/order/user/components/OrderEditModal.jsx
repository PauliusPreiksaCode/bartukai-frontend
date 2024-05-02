import React, { useEffect, useState } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { getServiceUnusedtimes } from '../../../../services/api';
import dayjs from 'dayjs';
import { useUpdateOrder } from '../../../../hooks/order';


export const OrderEditModal = ({ open, handleClose, order}) => {

  const [ awailabeTimes, setAwailabeTimes ] = useState([]);
  const [ selectedId, setSelectedId ] = useState(order.reservationId);
  const [ selectedPayment, setSelectedPayment] = useState(order.paymentType);
  const updateOrder = useUpdateOrder();

  const handleTimeChange = (event) => {
    setSelectedId(event.target.value);
  };

  const handlePaymentChange = (event) => {
    setSelectedPayment(event.target.value);
  };

  const handleUpdate = () => {
    const params = {
      'orderId': order.id,
      'newReservationId': parseInt(selectedId),
      'paymentType': parseInt(selectedPayment),
    };

    updateOrder.mutateAsync(params);
    handleClose();

  };

  const paymentType = {
    0: 'Grynais',
    1: 'Kortele',
  };

  const serviceLocation = {
    0: 'Verslo centro patalpos',
    1: 'Privačios specialisto patalpos',
    2: 'Virtualus vizitas',
  };

  useEffect(() => {
    const fetchData = async () => {
      const times = await getServiceUnusedtimes(order.serviceId);
      setAwailabeTimes(times);
    };
  
    fetchData();
  }, [order.serviceId]);

  const location = order.serviceLocation === 1 ? `Adresas: ${order.address}` : `Nuoroda ${order.link}`;

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Užsakymo informacija</DialogTitle>
      <div style={{padding: 30}}>
        <div style={{paddingBottom: 30}}>
          <Grid container rowSpacing={2} spacing={1}>
            <Grid item container xs={12}>
              <Grid item xs={5} style={{ fontWeight: 'bold' }}>
                Užsakymo numeris:
              </Grid>
              <Grid item xs={7}>
                {order.orderNumber}
              </Grid>
            </Grid>
            <Grid item container xs={12}>
              <Grid item xs={5} style={{ fontWeight: 'bold' }}>
                Paslaugos pavadinimas:
              </Grid>
              <Grid item xs={7}>
                {order.serviceName}
              </Grid>
            </Grid>
            <Grid item container xs={12}>
              <Grid item xs={5} style={{ fontWeight: 'bold' }}>
                Vizito laikas:
              </Grid>
              <Grid item xs={7}>
                {dayjs(order.dateFrom).format('YYYY-MM-DD HH:mm:ss')}
              </Grid>
            </Grid>
            <Grid item container xs={12}>
              <Grid item xs={5} style={{ fontWeight: 'bold' }}>
                Specialisto vardas:
              </Grid>
              <Grid item xs={7}>
                {order.specialistFirstName}
              </Grid>
            </Grid>
            <Grid item container xs={12}>
              <Grid item xs={5} style={{ fontWeight: 'bold' }}>
            Specialisto pavardė:
              </Grid>
              <Grid item xs={7}>
                {order.specialistLastName}
              </Grid>
            </Grid>
            <Grid item container xs={12}>
              <Grid item xs={5} style={{ fontWeight: 'bold' }}>
            Apmokėjimo būdas:
              </Grid>
              <Grid item xs={7}>
                {paymentType[order.paymentType]}
              </Grid>
            </Grid>
            <Grid item container xs={12}>
              <Grid item xs={5} style={{ fontWeight: 'bold' }}>
            Paslaugos teikimo vieta:
              </Grid>
              <Grid item xs={7}>
                {serviceLocation[order.serviceLocation]}
              </Grid>
            </Grid>
          </Grid>
        </div>
        <div style={{paddingBottom: 15}}>
          <FormControl fullWidth>
            <InputLabel id="id-select-label">Pasirinkti apmokėjimo būdą</InputLabel>
            <Select
              labelId="id-select-label"
              id="id-select"
              value={selectedPayment}
              onChange={handlePaymentChange}
              label="Pasirinkti apmokėjimo būdą"
            >
              {Object.entries(paymentType).map(([key, value]) => (
                <MenuItem key={key} value={key}>
                  {value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div style={{paddingBottom: 15}}>
          <FormControl fullWidth>
            <InputLabel id="id-select-label">Pasirinkti laiką</InputLabel>
            <Select
              labelId="id-select-label"
              id="id-select"
              value={selectedId}
              onChange={handleTimeChange}
              label="Pasirinkti laiką"
            >
              {awailabeTimes.map((time) => (
                <MenuItem key={time.id} value={time.id}>
                  {dayjs(time.dateFrom).format('YYYY-MM-DD HH:mm:ss')} - {dayjs(time.dateTo).format('YYYY-MM-DD HH:mm:ss')}
                  {order.serviceLocation === 0 ? ` Kabinetas ${time.roomId}` : ` ${location}`}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <Grid container justifyContent="center" spacing={2}>
          <Grid item xs={6}>
            <Button variant="contained" onClick={handleClose}>
              Uždaryti
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" onClick={handleUpdate}>
              Atnaujinti
            </Button>
          </Grid>
        </Grid>
      </div>
    </Dialog>
  );
};