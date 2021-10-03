import axios from "axios"

// Fetch all Users
export const listUsers = () => async (dispatch) => {
    try {
        // Set 'loading' to TRUE
        dispatch({ type: 'GET_ALL_USERS_REQUEST' })
        // Request to Server
        const { data } = await axios.get('/api/users/all');
        // -- TESTING -- //
        console.log(data);
        // Set 'payload' to returned DATA (from Server)
        dispatch({
            type: 'GET_ALL_USERS_SUCCESS',
            payload: data
        });

    } catch(error) {
        // Throw 'error' to dispatch
        dispatch({
            type: 'GET_ALL_USERS_FAIL',
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
}

// Fetch Single User -- User Detail
export const userDetail = (id) => async (dispatch) => {
    try {
        // Set 'loading' to TRUE
        dispatch({ type: 'GET_USER_DETAIL_REQUEST' });

        // Request User from Server
        let { data } = await axios.get(`/api/users/${id}`);
        console.log("User Detail: ");
        console.log(data);
        // Set 'payload' to returned DATA from Server
        dispatch({
            type: 'GET_USER_DETAIL_SUCCESS',
            payload: data
        });
    } catch(error) {
        dispatch({
            type: 'GET_USER_DETAIL_FAIL',
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
}