import React, {useState} from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Checkbox 
} from '@mui/material';
import {OccupancyViewModal} from "../../occupancy/OccupancyViewModal";

export const RoomViewModal = ({ open, handleClose, room}) => {

  const [showOccupancyViewModal, setShowOccupancyViewModal] = useState(false);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Patalpos informacija</DialogTitle>
      <DialogContent>
        <Grid container rowSpacing={2} spacing={1}>
          <Grid item xs={2.5} style={{fontWeight: 'bold'}}>
            ID:
          </Grid>
          <Grid item xs={8}>
            {room.id}
          </Grid>
          <Grid item xs={2.5} style={{fontWeight: 'bold'}}>
            Pavadinimas:
          </Grid>
          <Grid item xs={8}>
            {room.name}
          </Grid>
          <Grid item xs={2.5} style={{fontWeight: 'bold'}}>
            Tipas:
          </Grid>
          <Grid item xs={8}>
            {room.type}
          </Grid>
          <Grid item xs={2.5} style={{fontWeight: 'bold'}}>
            Aukštas:
          </Grid>
          <Grid item xs={8}>
            {room.floor}
          </Grid>
          <Grid item xs={2.5} style={{fontWeight: 'bold'}}>
            Talpinama žmonių:
          </Grid>
          <Grid item xs={8}>
            {room.accommodates}
          </Grid>
          <Grid item xs={2.5} style={{fontWeight: 'bold'}}>
            Patalpos aprašymas:
          </Grid>
          <Grid item xs={8}>
            {room.description}
          </Grid>
          <Grid item xs={2.5} style={{fontWeight: 'bold'}}>
            Teikiama:
          </Grid>
          <Grid item xs={8}>
            <Checkbox checked={room.isAvailable} readOnly/>
          </Grid>
        </Grid>
        <div>
          <Button disabled={showOccupancyViewModal} variant="contained"
                  onClick={() => setShowOccupancyViewModal(true)}>Rodyti užimtumą</Button>
        </div>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleClose}>Uždaryti</Button>
      </DialogActions>
      <OccupancyViewModal
        open={showOccupancyViewModal}
        handleClose={() => setShowOccupancyViewModal(false)}
        isRoom={true}
        id={room.id}/>
    </Dialog>
  );
};