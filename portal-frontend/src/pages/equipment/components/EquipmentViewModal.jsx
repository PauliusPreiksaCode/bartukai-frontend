import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Checkbox 
} from '@mui/material';

export const EquipmentViewModal = ({ open, handleClose, equipment}) => {


  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Įrangos informacija</DialogTitle>
      <DialogContent>
        <Grid container rowSpacing={2} spacing={1}>
          <Grid item xs={2.5} style={{ fontWeight: 'bold' }}>
            ID:
          </Grid>
          <Grid item xs={8}>
            {equipment.id}
          </Grid>
          <Grid item xs={2.5} style={{ fontWeight: 'bold' }}>
            Inventoriaus numeris:
          </Grid>
          <Grid item xs={8}>
            {equipment.inventoryNumber}
          </Grid>
          <Grid item xs={2.5} style={{ fontWeight: 'bold' }}>
            Pavadinimas:
          </Grid>
          <Grid item xs={8}>
            {equipment.name}
          </Grid>
          <Grid item xs={2.5} style={{ fontWeight: 'bold' }}>
            Būsena:
          </Grid>
          <Grid item xs={8}>
            {equipment.condition}
          </Grid>
          <Grid item xs={2.5} style={{ fontWeight: 'bold' }}>
            Tipas:
          </Grid>
          <Grid item xs={8}>
            {equipment.type}
          </Grid>
          <Grid item xs={2.5} style={{ fontWeight: 'bold' }}>
            Teikiama:
          </Grid>
          <Grid item xs={8}>
            <Checkbox checked={equipment.isAvailable} readOnly />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleClose}>Uždaryti</Button>
      </DialogActions>
    </Dialog>
  );
};