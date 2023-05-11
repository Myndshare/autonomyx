import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Import for navigation with react-router
import {BrowserRouter as Router, Route, Routes, Link, BrowserRouter} from 'react-router-dom';
import NavBar from './pages/Navbar';
import Landing from './pages/Landing';
import Checkout from './pages/Checkout';
import Layout from './pages/Layout';
import Tickets from './pages/Tickets';
import Events from './pages/Events';

import './App.css';
import { Amplify } from 'aws-amplify';

import { Grid, withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsExports from './aws-exports';

Amplify.configure(awsExports);

const theme = createTheme();

const navitems = {
  "Tickets": "/tickets",
  "Events": "/events"
}


function App({ signOut, user }) {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout navitems={navitems} signOut={signOut} user={user} />} >
          <Route index element={<Landing />} />
          <Route path="/tickets" element={<Tickets />} />
          <Route path="/events" element={<Events />} />
          <Route path="/checkout" element={<Checkout />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default withAuthenticator(App);
