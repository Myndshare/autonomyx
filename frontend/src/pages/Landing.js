import React from 'react';
import { Grid } from '@mui/material';


const Landing = () => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={3}>
                <p>Sidebar</p>
            </Grid>
            <Grid item xs={9}>
                <p>Upcoming shows</p>
            </Grid>
        </Grid>
    )
};

export default Landing;
