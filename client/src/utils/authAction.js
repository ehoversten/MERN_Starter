import axios from 'axios';

// -- Login User
export const login = (email, password) => async (dispatch) => {
    console.log("Running Login ACTION");
    try {
        // Set 'loading' to true
        dispatch({ type: 'GET_LOGIN_REQUEST' });
        // Attach Authorization Headers
        const config = {
            headers: {
                'Content-Type': 'application/json',
                "Accept":"application/json"
            },
            withCredentials: true
         }
        // Send Request to Server
        const { data } = await axios.post('/api/users/login', { email, password }, config);

        console.log("Found User Action...");
        console.log(data);
        console.log(typeof data);

        // Set 'payload' to returned DATA (from Server)
        dispatch({
            type: 'GET_LOGIN_SUCCESS',
            payload: data
        })

    } catch(error) {
        // Throw 'error' to dispatch
        dispatch({
            type: 'GET_LOGIN_FAIL',
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

// -- Logout User
export const logout = () => async (dispatch) => {
    console.log("Running LOGOUT ACTION ...");
    axios.get('/api/users/logout');
    dispatch({ type: 'USER_LOGOUT'});
    // history.push('/');
}

export const hasAuth = () => async (dispatch) => {
    console.log('Running hasAuth ACTION ...');
    try {
        // Attach Authorization Headers
        const config = {
            headers: {
                'Content-Type': 'application/json',
                "Accept":"application/json"
            },
            withCredentials: true
        }

        let { data } = await axios.get('/api/users/loggedIn', config);
        console.log(data);
        
    } catch(error) {
        console.log(error);
    }
}


// -- Register User
export const register = (first, last, username, email, password, confirm) => async (dispatch) => {
    console.log("Running Register ACTION");
    try {
        // Set 'loading' to true
        dispatch({ type: 'GET_REGISTER_REQUEST' });
        // Attach Authorization Headers
        const config = {
            headers: {
                'Content-Type': 'application/json',
                "Accept":"application/json"
            },
            withCredentials: true
         }
        // Send Request to Server
        const { data } = await axios.post('/api/users/register', { first, last, username, email, password, confirm }, config);

        console.log("Created User Action...");
        console.log(data);

        // Set 'payload' to returned DATA (from Server)
        dispatch({
            type: 'GET_REGISTER_SUCCESS',
            payload: data
        })

        dispatch({
            type: 'GET_LOGIN_SUCCESS',
            payload: data
        })
    } catch(error) {
        // Throw 'error' to dispatch
        dispatch({
            type: 'GET_REGISTER_FAIL',
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}