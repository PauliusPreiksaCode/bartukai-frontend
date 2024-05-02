import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from '@mui/material';
import dayjs from 'dayjs';
import { OrderRemoveModal } from './OrderRemoveModal';

export const OrderViewModal = ({ open, handleClose, order}) => {

  const [showOrderRemoveModal, setShowOrderRemoveModal] = useState(false);

  const currentDateObject = dayjs(dayjs().format('YYYY-MM-DD HH:mm:ss'));
  const dateObject = dayjs(order.dateTo);
  const canDelete = order.orderStatus === 0 && currentDateObject.isBefore(dateObject) ? true : false;

  const paymentMethod = {
    0: 'Gryni',
    1: 'Kortele',
  };

  const orderStatus = {
    0: 'Sukurta',
    1: 'Atšaukta',
    2: 'Ivykdyta',
  };

  const serviceLocation = {
    0: 'Verslo centro patalpos',
    1: 'Privačios specialisto patalpos',
    2: 'Virtualus vizitas',
  };

  const currentDate = dayjs().format('YYYY-MM-DD');

  const handleOrderRemoveModalClose = () => {
    setShowOrderRemoveModal(false);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth={'xl'}>
      <DialogTitle>Užsakymo informacija</DialogTitle>
      <DialogContent>
        <Grid container rowSpacing={2} spacing={1}>
          <Grid item container xs={6} rowSpacing={2} spacing={1}>
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
                Užsakymo data:
              </Grid>
              <Grid item xs={7}>
                {dayjs(order.customerOrderDate).format('YYYY-MM-DD HH:mm:ss')}
              </Grid>
            </Grid>
            <Grid item container xs={12}>
              <Grid item xs={5} style={{ fontWeight: 'bold' }}>
                Mokėjimo būdas:
              </Grid>
              <Grid item xs={7}>
                {paymentMethod[order.paymentType]}
              </Grid>
            </Grid>
            <Grid item container xs={12}>
              <Grid item xs={5} style={{ fontWeight: 'bold' }}>
                Užsakymo statusas:
              </Grid>
              <Grid item xs={7}>
                {order.orderStatus === 1 ? (
                  <>{orderStatus[1]}</>
                ) : (
                  <>
                    {currentDate > order.dateTo.slice(0, 10) ? (
                      <>{orderStatus[2]}</>
                    ) : (
                      <>{orderStatus[0]}</>
                    )}
                  </>
                )}
              </Grid>
            </Grid>
            <Grid item container xs={12}>
              <Grid item xs={5} style={{ fontWeight: 'bold' }}>
                Vizito pradžia:
              </Grid>
              <Grid item xs={7}>
                {order.dateFrom ? dayjs(order.dateFrom).format('YYYY-MM-DD HH:mm') : '-'}  
              </Grid>
            </Grid>
            <Grid item container xs={12}>
              <Grid item xs={5} style={{ fontWeight: 'bold' }}>
                Vizito pabaiga:
              </Grid>
              <Grid item xs={7}>
                {order.dateTo ? dayjs(order.dateTo).format('YYYY-MM-DD HH:mm') : '-'}
              </Grid>
            </Grid>
          </Grid>
          <Grid item container xs={6} rowSpacing={2} spacing={1}>
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
                Paslaugos teikimo vieta:
              </Grid>
              <Grid item xs={7}>
                {serviceLocation[order.serviceLocation]}
              </Grid>
            </Grid>
            {order.serviceLocation === 0 ? (
              <Grid item container xs={12}>
                <Grid item xs={5} style={{ fontWeight: 'bold' }}>
                  Kabinetas:
                </Grid>
                <Grid item xs={7}>
                  {order.roomName}
                </Grid>
              </Grid>
            ) : null}
            {order.serviceLocation === 1 ? (
              <Grid item container xs={12}>
                <Grid item xs={5} style={{ fontWeight: 'bold' }}>
                  Adresas ir papildoma informacija:
                </Grid>
                <Grid item xs={7}>
                  <>
                    <div>
                      {order.address}
                    </div>
                    <div>
                      {order.addressDescription}
                    </div>
                  </>
                </Grid>
              </Grid>
            ) : null}
            {order.serviceLocation === 2 ? (
              <Grid item container xs={12}>
                <Grid item xs={5} style={{ fontWeight: 'bold' }}>
                  Nuoroda:
                </Grid>
                <Grid item xs={7}>
                  {order.link}
                </Grid>
              </Grid>
            ) : null}
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleClose}>Uždaryti</Button>
        {canDelete && (
          <>
            <Button variant="contained" color="error" onClick={() => setShowOrderRemoveModal(true)} >Ištrinti</Button>
            <OrderRemoveModal 
              open={showOrderRemoveModal} 
              handleClose={() => handleOrderRemoveModalClose()} 
              order={order}
            />
          </>
        )}
      </DialogActions>
    </Dialog>
  );
};