import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

const Checkout = () => {
  const savedEventsCookie = Cookies.get('savedEvents');
  const savedEvents = savedEventsCookie ? JSON.parse(savedEventsCookie) : [];

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const priceSum = savedEvents.reduce((total, event) => total + event.price, 0);
    setTotalPrice(priceSum);
  }, [savedEvents]);

  const handlePurchase = () => {
    // Implement purchase functionality here
  };

  const handleRemove = (id) => {
    const updatedEvents = savedEvents.filter((event) => event.id !== id);
    Cookies.set('savedEvents', JSON.stringify(updatedEvents));
    window.location.reload();
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start' , backgroundColor: '#fafafa'}}>
      <Box
        sx={{
          position: 'sticky',
          top: 'calc(64px + 0.5rem)',
          left: '2rem',
          minWidth: '300px',
          width: 'fit-content',
          height: 'fit-content',
          background: '#fff',
          padding: '2rem',
          borderRadius: '6px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        }}
      >
        <Typography variant="h6" sx={{ mb: '1rem' }}>
          Summary
        </Typography>
        <TableContainer>
        <Table>
  <TableHead>
    <TableRow>
      <TableCell>Event Name</TableCell>
      <TableCell align="right">Price</TableCell>
    </TableRow>
  </TableHead>
  <TableBody>
    {savedEvents.map((event) => (
      <TableRow key={event.id}>
        <TableCell component="th" scope="row">
          {event.name}
        </TableCell>
        <TableCell align="right">${event.price}</TableCell>
      </TableRow>
    ))}
    <TableRow>
      <TableCell>Total</TableCell>
      <TableCell align="right">${totalPrice}</TableCell>
    </TableRow>
  </TableBody>
</Table>

        </TableContainer>
        <Button
          variant="contained"
          size="large"
          sx={{ mt: '1rem' }}
          onClick={handlePurchase}
          disabled={savedEvents.length === 0}
        >
          Checkout
        </Button>
      </Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {savedEvents.length > 0 ? (
          savedEvents.map((event) => (
            <Card key={event.id} sx={{ width: 380, m: 2 }}>
              <CardMedia
                component="img"
                height="200"
                image={event.imageUrl}
                alt={event.name}
              />
              <CardContent>
                <Typography variant="h5" component="h2">
                  {event.name}
                </Typography>
                <Typography color="text.secondary">
                  {event.artist} - {event.type} - {event.venue}
                </Typography>
                <Typography sx={{ mt: 2 }} variant="body2">
                  {new Date(event.date).toLocaleDateString()} at{' '}
                  {new Date(event.date).toLocaleTimeString()}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => handleRemove(event.id)}>
                  Remove
                </Button>
              </CardActions>
            </Card>
          ))
        ) : (
          <Typography sx={{ my: 2 }}>No saved events found.</Typography>
        )}
      </Box>
    </Box>
  );
};

export default Checkout;
