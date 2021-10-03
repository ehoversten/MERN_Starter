import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Card } from 'react-bootstrap';
import { userDetail } from '../../../utils/actions';
import Loader from '../../../components/Loader/Loader';
import Message from '../../../components/Message/Message';

const UserDetail = ({ match }) => {

    console.log(match);
    const dispatch = useDispatch();
    const foundUser = useSelector(state => state.userDetail);
    const { loading, error, user } = foundUser;
    useEffect( async () => {
        dispatch(userDetail(match.params.id))
    }, [dispatch, match]);

    return (
        <Container>
            <Row>
                { loading ? (
                <Loader/>
                ) : error ? (
                    <Message variant="danger">{error}</Message>
                ) : (
                    <Card>
                        <h1>User Detail</h1>
                        <h3>{user.username}</h3>
                        <h3>{user.email}</h3>
                    </Card>
                )}
            </Row>
        </Container>
    )
}


export default UserDetail;