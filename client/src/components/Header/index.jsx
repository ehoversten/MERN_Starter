import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../utils/authAction';
import { Navbar, Nav, Container } from 'react-bootstrap';

const Header = () => {

    const dispatch = useDispatch();
    const userLogin = useSelector(state => state.userLogin);
    console.log("IN HEADER ...")
    console.log(userLogin);
    const { userInfo } = userLogin

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
                    { userInfo ? (
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