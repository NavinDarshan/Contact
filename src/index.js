import React from 'react';
import ReactDOM from 'react-dom';

import indexReducer from './Reducers/userReducer'
import noteReducer from './Reducers/noteReducer'
import {createStore , combineReducers , applyMiddleware}   from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger'
import thunk from 'redux-thunk'

import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import Routes from './Routes'


const rootReducer = combineReducers({note: noteReducer, user: indexReducer})
const store = createStore(rootReducer, applyMiddleware(logger,thunk));




ReactDOM.render(
    <React.StrictMode>
        <Provider store = {store}>
        <Routes />
        </Provider>
        </React.StrictMode>,
    document.getElementById('root')
);

