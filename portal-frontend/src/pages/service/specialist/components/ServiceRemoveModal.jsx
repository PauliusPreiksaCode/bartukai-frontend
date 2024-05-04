import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
} from '@mui/material';

export const ServiceRemoveModal = ({ open, handleClose, service, onRemoveService}) => {

  const handleDelete = () =>{
    onRemoveService.mutateAsync(service.id); 
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth={'xs'}>
      <DialogTitle>Ar tikrai norite ištrinti šią paslaugą?</DialogTitle>
      <DialogActions style={{justifyContent: "center", alignItems: "center", display: "flex"}}>
        <Button variant="contained" onClick={handleClose} >Atšaukti</Button>
        <Button variant="contained" color="error" onClick={handleDelete}>Trinti</Button>
      </DialogActions>
    </Dialog>
  );
};