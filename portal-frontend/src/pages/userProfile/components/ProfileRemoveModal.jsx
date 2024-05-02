import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from '@mui/material';
import { useDeleteUser } from '../../../hooks/user';

export const ProfileRemoveModal = ({ open, handleClose, user}) => {

  const deleteUser = useDeleteUser();
  const handleDelete = () => {
    deleteUser.mutateAsync(user.id);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Ar tikrai norite ištrinti šią paskyrą?</DialogTitle>
      <DialogContent>
        <Grid container rowSpacing={2} spacing={1}>
          <Grid item xs={2.5} style={{ fontWeight: 'bold' }}>
            Vartotojo vardas:
          </Grid>
          <Grid item xs={8}>
            {user.userName}
          </Grid>
          <Grid item xs={2.5} style={{ fontWeight: 'bold' }}>
            El. pašto adresas:
          </Grid>
          <Grid item xs={8}>
            {user.email}
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleClose}>Atšaukti</Button>
        <Button variant="contained" color="error" onClick={handleDelete}>Trinti</Button>
      </DialogActions>
    </Dialog>
  );
};