// A layout component that wraps around the main content of the page

import React from 'react';
import { Grid } from '@mui/material';
import NavBar from './Navbar';
import { Outlet } from 'react-router-dom';
// import Footer from './Footer';


const Layout = ({ navitems, signOut, user, children }) => {
    return (
        <>
            <NavBar navItems={navitems} signOut={signOut} user={user} />
            <Outlet />
        </>
    )
};

export default Layout;