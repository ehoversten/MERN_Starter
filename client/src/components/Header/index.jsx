import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../utils/authAction';
import { Navbar, Nav, Container } from 'react-bootstrap';
import axios from 'axios';

const Header = () => {

    const [loggedIn, setLoggedIn] = useState(false);
    const dispatch = useDispatch();
    const userLogin = useSelector(state => state.userLogin);
    console.log("IN HEADER ...")
    console.log(userLogin);
    const { userInfo } = userLogin

    useEffect( async () => {
        
        let { data } = await axios.get('/api/users/loggedIn', {
            headers: {
                "Content-Type":"application/json",
                "Accept":"application/json"
            }, 
            // HOW TO SEND THE COOKIE (JWT) with the REQUEST (???)
            withCredential: true
        });
        console.log(data);

        if(!data) {
            setLoggedIn(false);
        } else {
            console.log(data);
            setLoggedIn(true);
        }

    }, [loggedIn])

    const handleLogout = () => {
        console.log("LOGOUT ....");
        dispatch(logout());
    }

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/">#Company</Navbar.Brand>
                <Nav className="ms-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    { loggedIn ? (
                        <>
                            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                        </>
                    ) : (
                         <>
                            <Nav.Link href="/register">Register</Nav.Link>
                            <Nav.Link href="/login">Login</Nav.Link>
                        </>
                    )} 
                </Nav>
            </Container>
        </Navbar>
    )
}

export default Header;