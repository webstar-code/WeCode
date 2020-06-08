import { createStore, applyMiddleware } from 'redux';
import allreducers from '../reducers/allreducers.js'
const thunkMiddleware = require('redux-thunk').default;
const store = createStore(allreducers, applyMiddleware(thunkMiddleware));

export default store;