import axios from 'axios';
// import cookie from 'react-cookie';
// let cookie = require('cookie');
// import cookie from 'cookie';
// import cookie from 'react-cookies';
// import Cookies from 'js-cookie';

// Login User
export const login = (email, password) => async (dispatch) => {

    try {
        // Set 'loading' to true
        dispatch({ type: 'GET_LOGIN_REQUEST' });
        // Attach Authorization Headers
        const config = {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
         }
        // Send Request to Server
        // const { data } = await axios.get('/api/users/loggedIn');
        const { data } = await axios.post('/api/users/login', { email, password }, config);
        // await axios.post('/api/users/login', { email, password }, config);

        // const data = cookie.parse('token');
        // let data = cookie.load("token");
        // let d2 = Cookies.get("token");
        console.log("Found User Action...");
        console.log(data);
        // console.log(typeof d2);
        console.log(typeof data);
        // console.log(d2[0]);
        // console.log(d2[1]);
        // console.log(d2[2]);
        // console.log(Cookies.get());
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