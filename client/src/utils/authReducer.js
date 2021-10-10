// Fetch Login User -- User Reducer
export const userLoginReducer = (state = { userInfo: {} }, action) => {
    switch(action.type) {
        case 'GET_LOGIN_REQUEST':
            return { loading : true, ...state }
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