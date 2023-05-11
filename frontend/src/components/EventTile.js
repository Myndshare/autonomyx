import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button, Box } from '@mui/material';
import { styled } from '@mui/system';
import EventModal from './EventModal';

const StyledCard = styled(Card)({
  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
  '&:hover': {
    transform: 'scale(1.02)',
    boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)',
  },
});



const ButtonsContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  position: 'absolute',
  bottom: 0,
  right: 0,
  width: '100%',
  padding: '0.5rem',
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
});

const ButtonStyled = styled(Button)({
  marginLeft: '0.5rem',
});

const EventTile = ({ event, onSaveForLater }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handlePurchase = (event) => {
    event.stopPropagation();
    handlePurchase(event);
    };

  const handleSave = (e) => {
    e.stopPropagation();
    // Handle button click action here
    onSaveForLater(event);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <StyledCard onClick={handleOpen}>
        <CardMedia
          component="img"
          height="140"
          image="https://via.placeholder.com/200x140"
          alt="Event Image"
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {event.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Type: {event.type}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Venue: {event.venue}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Date: {event.date}
          </Typography>
        </CardContent>
        <ButtonsContainer>
          <ButtonStyled variant="outlined" onClick={handleSave}>Save for later</ButtonStyled>
          <ButtonStyled variant="contained" onClick={handlePurchase} color="primary">Purchase</ButtonStyled>
        </ButtonsContainer>
      </StyledCard>
      <EventModal open={open} handleClose={handleClose} event={event} />
    </>
  );
};

export default EventTile;