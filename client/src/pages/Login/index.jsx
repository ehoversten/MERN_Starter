import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Container, Card, Form, Button } from 'react-bootstrap';
import './styles.css';
import { login } from '../../utils/authAction';
import Message from '../../components/Message/Message';
import Loader from '../../components/Loader/Loader';
// import axios from 'axios';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const userLogin = useSelector(state => state.userLogin);
    const { loading, error, userInfo } = userLogin;

    const history = useHistory();

    useEffect(() => {
        if(userInfo) {
            history.push('/');
        }
    }, [userInfo]) 

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Submission...")
        // Dispatch LOGIN
        dispatch(login(email, password))
        history.push('/');
        // try {
        //     let loginData = {
        //         email,
        //         password
        //     }
        //     await axios.post('http://localhost:3001/api/users/login', loginData, { withCredentials: true });
        //     history.push('/');
        // } catch(err) {
        //     console.error(err);
        // }
    }; 

    return (
       <Container id="login">
            <Card className="mt-5">
                { error && <Message variant='danger'>{error}</Message>}
                { loading && <Loader />}
                <Card.Header>User Login</Card.Header>
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control 
                                type="email" 
                                placeholder="Enter email" 
                                onChange={ (e) => setEmail(e.target.value) } 
                                value={email}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control 
                                type="password" 
                                placeholder="Enter Password"
                                onChange={ (e) => setPassword(e.target.value) } 
                                value={password}/>
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Login
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default Login;