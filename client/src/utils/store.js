import { createStore, combineReducers, applyMiddleware } from 'redux' ;
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { userDetailReducer, usersReducer } from './reducers';
import { userLoginReducer, userRegisterReducer } from './authReducer';

const reducers = combineReducers({
    userList: usersReducer,
    userDetail: userDetailReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer
});

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

const initialState = {
    userLogin: { userInfo: {} }
};

const middleware = [thunk];

const store = createStore(
    reducers,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);


export default store;