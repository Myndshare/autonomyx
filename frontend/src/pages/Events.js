import React, { useState, useEffect } from 'react';
import { styled, useTheme } from '@mui/system';
import {
    Typography,
    Grid,
    Drawer,
    List,
    ListItem,
    ListItemText,
    Checkbox,
    FormControlLabel,
    Divider,
} from '@mui/material';
import Cookies from 'js-cookie';
import EventTile from '../components/EventTile';


const drawerWidth = 240;

const Main = styled('main')(({ theme }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
}));

const StyledDrawer = styled(Drawer)(({ theme }) => ({
    width: drawerWidth,
    flexShrink: 0,
    '& .MuiDrawer-paper': {
        width: drawerWidth,
        backgroundColor: '#1a1a1a',
        color: 'white', 
    },
}));

const EventPage = () => {
    const theme = useTheme();
    const artists = ['Adele', 'Beyoncé', 'Coldplay', 'Drake', 'Ed Sheeran', 'Foo Fighters', 'Gorillaz', 'Halsey', 'Imagine Dragons', 'Justin Timberlake'];

    const events = [];

    for (let i = 0; i < 40; i++) {
        const event = {
            id: i + 1,
            name: `${artists[Math.floor(Math.random() * 10)]} Show`,
            type: ['Rock', 'Pop', 'Jazz'][Math.floor(Math.random() * 3)],
            venue: ['Arena', 'Theater', 'Club'][Math.floor(Math.random() * 3)],
            date: new Date(2022, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString(),
            artist: artists[Math.floor(Math.random() * 10)],
        };
        events.push(event);
    }
    const [savedEvent, setSavedEvent] = useState([]);
    const [filter, setFilter] = useState({
        type: {
            Rock: true,
            Pop: true,
            Jazz: true,
        },
        venue: {
            Arena: true,
            Theater: true,
            Club: true,
        },
    });

    useEffect(() => {
        const savedEventsCookie = Cookies.get('savedEvents');
        console.log(savedEventsCookie)
        if (savedEventsCookie) {
          setSavedEvent(JSON.parse(savedEventsCookie));
        }
      }, []);
      
    useEffect(() => {
        Cookies.set('savedEvents', JSON.stringify(savedEvent));
    }, [savedEvent]);

    const handleFilter = (event) => {
        setFilter({
            ...filter,
            [event.target.name]: {
                ...filter[event.target.name],
                [event.target.value]: event.target.checked,
            },
        });
    };

    const handleSaveForLater = (event) => {
        setSavedEvent([...savedEvent, event]);
        console.log(savedEvent);
    };

    const filteredEvents = events.filter((event) => {
        return (
            filter.type[event.type] &&
            filter.venue[event.venue] &&
            !savedEvent.some((saved) => saved.id === event.id)
        );
    });


    return (
        <Grid container spacing={1} style={{ padding: '1rem' }}>
            <Grid item xs={12} md={2}>
            <StyledDrawer
                variant="permanent"
                anchor="left"
            >
                <List>
                    <Typography gutterBottom variant="h6">
                        FILTERS
                    </Typography>
                    <Divider />
                    <ListItemText primary="Type" />
                    {Object.keys(filter.type).map((key) => (
                        <ListItem key={key}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={filter.type[key]}
                                        onChange={handleFilter}
                                        name="type"
                                        value={key}
                                    />
                                }
                                label={key}
                            />
                        </ListItem>
                    ))}
                    <Divider />
                    <ListItemText primary="Venue" />
                    {Object.keys(filter.venue).map((key) => (
                        <ListItem key={key}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={filter.venue[key]}
                                        onChange={handleFilter}
                                        name="venue"
                                        value={key}
                                    />
                                }
                                label={key}
                            />
                        </ListItem>
                    ))}
                </List>
            </StyledDrawer>
            </Grid>
            <Grid item xs={12} md={9}>
            <Main>
                <Typography gutterBottom variant="h4">
                    Your planned events
                </Typography>
                <Grid container spacing={3}>
                    {savedEvent.map((event) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={event.id}>
                            <EventTile event={event} onSaveForLater={handleSaveForLater} />
                        </Grid>
                    ))}</Grid>
                <Typography gutterBottom variant="h4">
                    Upcoming events
                </Typography>
                <Grid container spacing={3}>
                    {filteredEvents.map((event) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={event.id}>
                            <EventTile event={event} onSaveForLater={handleSaveForLater} />
                        </Grid>
                    ))}
                </Grid>
            </Main>
            </Grid>
        </Grid>
    );
};

export default EventPage;
