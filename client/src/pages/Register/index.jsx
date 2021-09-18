import React, { useState } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import axios from 'axios';

const Register = () => {

    const [first, setFirst] = useState('');
    const [last, setLast] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Submission...")

        try {
            let registerData = {
                first, 
                last, 
                username,
                email,
                password,
                confirm
            }
            await axios.post('http://localhost:3001/api/users/register', registerData);

        } catch(err) {
            console.error(err);
        }
    }; 

    return (
        <Container>
            <Card className="mt-5">
                <Card.Header>Register A New User</Card.Header>
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicText">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Enter First Name"
                                onChange={ (e) => setFirst(e.target.value) } 
                                value={first}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicText">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Enter Last Name" 
                                onChange={ (e) => setLast(e.target.value) } 
                                value={last}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicText">
                            <Form.Label>Username</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Enter Username" 
                                onChange={ (e) => setUsername(e.target.value) } 
                                value={username}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control 
                                type="email" 
                                placeholder="Enter email" 
                                onChange={ (e) => setEmail(e.target.value) } 
                                value={email}/>
                            <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control 
                                type="password" 
                                placeholder="Enter Password"
                                onChange={ (e) => setPassword(e.target.value) } 
                                value={password}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Confirm</Form.Label>
                            <Form.Control 
                                type="password" 
                                placeholder="Confirm Password"
                                onChange={ (e) => setConfirm(e.target.value) } 
                                value={confirm}/>
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Register
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default Register;