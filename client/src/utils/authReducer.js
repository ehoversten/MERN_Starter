// Fetch Login User -- User Reducer
export const userLoginReducer = (state = { userInfo: {} }, action) => {
    switch(action.type) {
        case 'GET_LOGIN_REQUEST':
            return { loading: true, ...state }
        case 'GET_LOGIN_SUCCESS':
            return { loading: false, userInfo: action.payload }
        case 'GET_LOGIN_FAIL':
            return { loading: false, error: action.payload }
        case 'USER_LOGOUT':
            // return { loading: false, userInfo: {} };
            return {};
        default:
            return state
    }
}


// Fetch Register User -- Register Reducer
export const userRegisterReducer = (state = {}, action) => {
    switch(action.type) {
        case 'GET_REGISTER_REQUEST':
            return { loading: true, ...state }
        case 'GET_REGISTER_SUCCESS':
            return { loading: false, userInfo: action.payload }
        case 'GET_REGISTER_FAIL':
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

// Fetch Authorized User -- Authorized Reducer
export const isAuthReducer = (state = {}, action) => {
    switch(action.type) {
        case 'GET_AUTH_REQUEST':
            return { loading: true, ...state }
        case 'GET_AUTH_SUCCESS':
            return { loading: false, isAuth: action.payload }
        case 'GET_AUTH_FAIL':
            return { loading: false, error: action.payload }
        default: 
            return state;
    }
}
