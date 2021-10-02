import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Row, Card } from 'react-bootstrap';
import axios from 'axios';

const AdminUsers = () => {

    const [users, setUsers] = useState();
    
    useEffect( async () => {
        let data = await axios.get('/api/users/all');
        console.log(data.data);
        setUsers(data.data);
    }, []);

    return (
        <Container id="admin-users">
            <h1>All Users</h1>
            <ul>
                { users ? users.map(user => (
                    <li>User: {user.username}  | Email: {user.email}</li>
                    )) : null
                }
            </ul>
        </Container>
    )
}

export default AdminUsers;