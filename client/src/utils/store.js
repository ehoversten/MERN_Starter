import { createStore, combineReducers, applyMiddleware } from 'redux' ;
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { userDetailReducer, usersReducer } from './reducers';

const reducers = combineReducers({
    userList: usersReducer,
    userDetail: userDetailReducer
});

const initialState = {};

const middleware = [thunk];

const store = createStore(
    reducers,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);


export default store;