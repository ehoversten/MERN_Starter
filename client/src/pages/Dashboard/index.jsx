import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import './styles.css';
import axios from 'axios';

const Dashboard = () => {

    const [username, setUsername] = useState('');
    const [isUser, setIsUser] = useState(false);

    // useEffect( async () => {
    //     // setIsUser(false);
    //     // HOW TO SEND THE COOKIE (JWT) with the REQUEST (???)

    //     // let user = await axios.get('/api/users/loggedIn');
    //     let user = await fetch('api/users/loggedIn', {
    //         method: 'GET',
    //         headers: {
    //             "Content-Type":"application/json",
    //             "Accept":"application/json"
    //         }, 
    //         credentials: "include"
    //     })

    //     console.log(user);
    //     // if(user) {
    //     //     let userToken = res.cookies.token;
    //     //     console.log(userToken)
    //     //     setUsername = jwt.verify(userToken, process.env.JWT_SECRET);
    //     // }
    //     setIsUser(user);
    // }, [])

    return (
        <Container id="dash">
            <h1>Dashboard</h1>
            { isUser ? <h1>True</h1> : <h1>False</h1> }
        </Container>
    )
}

export default Dashboard;