import axios from "axios"

export const listUsers = () => async (dispatch) => {
    try {
        dispatch({ type: 'GET_ALL_USERS_REQUEST' })

        const { data } = await axios.get('/api/users/all');

        dispatch({
            type: 'GET_ALL_USERS_SUCCESS',
            payload: data
        });

    } catch(error) {
        dispatch({
            type: 'GET_ALL_USERS_FAIL',
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
}