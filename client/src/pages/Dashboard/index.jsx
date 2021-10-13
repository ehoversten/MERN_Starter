import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import './styles.css';
import axios from 'axios';

const Dashboard = () => {

    const [loggedIn, setLoggedIn] = useState(false) ;
    const [user, setUser] = useState({});

    useEffect( async () => {
        // HOW TO SEND THE COOKIE (JWT) with the REQUEST (???)

        let { data } = await axios.get('/api/users/loggedIn', {
            headers: {
                "Content-Type":"application/json",
                "Accept":"application/json"
            }, 
            withCredential: true
        });
        console.log(data);

        if(!data) {
            setLoggedIn(false);
        } else {
            console.log(data);
            // setUser(data);
            setLoggedIn(true);
        }

    }, [])

    return (
        <Container id="dash">
            <h1>Dashboard</h1>
            { loggedIn ? <h1>True</h1> : <h1>False</h1> }
            { user ? <h1>{user.username}</h1> : null }
        </Container>
    )
}

export default Dashboard;