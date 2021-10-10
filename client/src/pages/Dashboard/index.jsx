import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import './styles.css';
import axios from 'axios';

const Dashboard = () => {

    const [username, setUsername] = useState('');
    const [isUser, setIsUser] = useState(false);

    useEffect( async () => {
        let user = await axios.get('https://localhost:3001/api/users/loggedIn');
        // if(user) {
        //     let userToken = res.cookies.token;
        //     console.log(userToken)
        //     setUsername = jwt.verify(userToken, process.env.JWT_SECRET);
        // }
        setIsUser(user);
    }, [])

    return (
        <Container id="dash">
            <h1>Dashboard</h1>
            { isUser ? <h1>True</h1> : <h1>False</h1>
            }
        </Container>
    )
}

export default Dashboard;