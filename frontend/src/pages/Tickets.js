// Write a react component to display a list of tickets retrieved from a cognito protected API endpoint
// The API endpoint is: https://api-dev.veertly.com/tickets

import React, { useState, useEffect } from "react";
import { Auth } from "aws-amplify";
import { withAuthenticator } from "@aws-amplify/ui-react";
import axios from "axios";

const Tickets = () => {
    const [user, setUser] = useState(null);
    const [tickets, setTickets] = useState([]);
    const [error, setError] = useState(null);
    

    const handleSignOut = async () => {
        try {
        await Auth.signOut();
        setUser(null);
        } catch (error) {
        console.log(error);
        }
    };
    
    useEffect(() => {
        const getTickets = async () => {
        try {
            const session = await Auth.currentSession();
            const token = session.getIdToken().getJwtToken();
            const response = await axios.get(
            "https://api-dev.veertly.com/tickets",
            {
                headers: {
                Authorization: token,
                },
            }
            );
            setTickets(response.data);
        } catch (error) {
            setError(error);
        }
        };
        getTickets();
    }, []);
    
    if (error) {
        return <div>{error.message}</div>;
    }
    
    return (
        <div>
        {tickets.map((ticket) => (
            <div key={ticket.id}>
            <h3>{ticket.name}</h3>
            <p>{ticket.description}</p>
            </div>
        ))}
        </div>
    );
    };

export default withAuthenticator(Tickets);