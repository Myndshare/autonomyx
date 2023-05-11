import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  Typography,
} from '@mui/material';

const EventModal = ({ open, handleClose, event }) => {
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="lg">
      <DialogTitle>{event.name}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12} md={7}>
            <img
              src="https://via.placeholder.com/600x400"
              alt={event.name}
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </Grid>
          <Grid item xs={12} md={5}>
            <Typography variant="body1" gutterBottom>
              Type: {event.type}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Venue: {event.venue}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Date: {event.date}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Artist: {event.artist}
            </Typography>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 'auto' }}>
        <Button variant="outlined" color="secondary" size="large" style={{ marginRight: '1rem' }}>
          Save for later
        </Button>
        <Button variant="contained" color="secondary" size="large">
          Purchase
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EventModal;
