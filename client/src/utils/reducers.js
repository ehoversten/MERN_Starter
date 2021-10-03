export const userReducer = (state = { users: [] }, action) => {
    switch(action.type)  {
        case 'GET_ALL_USERS_REQUEST':
            return { loading : true, users: [] }
        case 'GET_ALL_USERS_SUCCESS':
            return { loading: false, users: action.payload }
        case 'GET_ALL_USERS_FAIL':
            return { loading: false, error: action.payload }
        default:
            return state
    }
}