import {createStore, applyMiddleware, compose} from 'redux';
import Reducer from './reducer';
import thunkMiddleware from 'redux-thunk'

const composeEnhacer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    Reducer,
    composeEnhacer(applyMiddleware(thunkMiddleware))
)

export default store;