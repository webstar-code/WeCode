import { combineReducers } from 'redux';
import islogged from './islogged';
import users from './users';
import userprofile from './userProfile';

const allreducers = combineReducers({
    islogged,
    users,
    userprofile
});

export default allreducers;
