import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
} from '@mui/material';
import { useDeleteOrder } from '../../../../hooks/order';

export const OrderRemoveModal = ({ open, handleClose, order}) => {

  const deleteUser = useDeleteOrder();

  const handleDelete = () =>{
    deleteUser.mutateAsync(order.id);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Ar tikrai norite ištrinti šį užsakymą?</DialogTitle>
      <DialogActions>
        <Button variant="contained" onClick={handleClose}>Atšaukti</Button>
        <Button variant="contained" color="error" onClick={handleDelete}>Ištrinti</Button>
      </DialogActions>
    </Dialog>
  );
};