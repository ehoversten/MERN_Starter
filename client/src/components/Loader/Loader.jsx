import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loader = () => {
    return (
        <Spinner 
            animation="border" 
            variant="success" 
            role="status"
            size="md">
            <span>Loading ...</span>
        </Spinner>
    )
}

export default Loader;