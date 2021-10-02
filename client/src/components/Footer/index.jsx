import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './styles.css'

const Footer = () => {

    return (
        <Container fluid className="footer">
            <Row className="container">
                <Col sm={4}>LOGO</Col>
                <Col>
                    <h5 className="first">About Us</h5>
                    <ul>
                        <li>Story</li>
                        <li>Clients</li>
                        <li>Testimonials</li>
                    </ul>        
                </Col>
                <Col>
                    <h5 className="first">Services</h5>
                    <ul>
                        <li>Marketing</li>
                        <li>Consulting</li>
                        <li>Development</li>
                    </ul>        
                </Col>
                <Col>
                    <h5 className="first">Contact Us</h5>
                    <ul>
                        <li>Virginia</li>
                        <li>Washington DC</li>
                        <li>Michigan</li>
                        <li>Germany</li>
                    </ul>        
                </Col>
                <Col>
                    <h5 className="first">Social</h5>
                    <ul>
                        <li>Facebook</li>
                        <li>Twitter</li>
                        <li>Instagram</li>
                        <li>LinkedIn</li>
                    </ul>        
                </Col>
            </Row>
        </Container>
    )
}

export default Footer;