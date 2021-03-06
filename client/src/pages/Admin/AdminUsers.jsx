import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { listUsers } from '../../utils/actions';
import Loader from '../../components/Loader/Loader';
import Message from '../../components/Message/Message';
// import { userReducer } from '../../utils/reducers';
import { Container, Row, Card } from 'react-bootstrap';
import axios from 'axios';

const AdminUsers = () => {
    const dispatch = useDispatch();
    // const [users, setUsers] = useState();
    const userList = useSelector(state => state.userList);
    // Destructure from userList Object STATE
    const { loading, error, users } = userList;
    
    useEffect( () => {
        // let data = await axios.get('/api/users/all');
        // console.log(data.data);
        // setUsers(data.data);

        dispatch( listUsers() );
    }, [dispatch]);

    return (
        <Container id="admin-users">
            <h1>All Users</h1>
            { loading ? (
                <Loader/>
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <ul>
                    { users ? users.map(user => (
                        <li>User: {user.username}  | Email: {user.email}</li>
                        )) : null
                    }
                </ul>
            )}
        </Container>
    )
}

export default AdminUsers;