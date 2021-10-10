import axios from 'axios';

// Login User
export const login = (email, password) => async (dispatch) => {
    try {
        // Set 'loading' to true
        dispatch({ type: 'GET_LOGIN_REQUEST' });
        // Attach Authorization Headers
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
         }
        // Send Request to Server
        const { data } = await axios.get('/api/users/loggedIn');
        // const { data } = await axios.post('/api/users/login', { email, password }, config);
        // await axios.post('/api/users/login', { email, password }, config);
        console.log("Found User Action...");
        console.log(data);
        // Set 'payload' to returned DATA (from Server)
        dispatch({
            type: 'GET_LOGIN_SUCCESS',
            payload: data
        })
        // Set User Info 
        // localStorage.setItem('userInfo', JSON.stringify(data));
    } catch(error) {
        // Throw 'error' to dispatch
        dispatch({
            type: 'GET_LOGIN_FAIL',
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}