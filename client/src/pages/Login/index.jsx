import React, { useState } from 'react';
import { Container, Card, Form, Button } from 'react-bootstrap';
import axios from 'axios';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Submission...")

        try {
            let loginData = {
                email,
                password
            }
            await axios.post('http://localhost:3001/api/users/login', loginData, { withCredentials: true });

        } catch(err) {
            console.error(err);
        }
    }; 

    return (
       <Container>
            <Card className="mt-5">
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