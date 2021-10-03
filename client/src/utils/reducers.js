// Fetch all Users
export const usersReducer = (state = { users: [] }, action) => {
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

// Fetch Single User -- User Detail
export const userDetailReducer = (state = { user: {} }, action) => {
    switch(action.type)  {
        case 'GET_USER_DETAIL_REQUEST':
            return { loading : true, ...state }
        case 'GET_USER_DETAIL_SUCCESS':
            return { loading: false, user: action.payload }
        case 'GET_USER_DETAIL_FAIL':
            return { loading: false, error: action.payload }
        default:
            return state
    }
}