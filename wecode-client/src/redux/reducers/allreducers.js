import { combineReducers } from 'redux';
import islogged from './islogged';
import users from './users';
import UserProfile from './UserProfile';

const allreducers = combineReducers({
    islogged,
    users,
    UserProfile
});

export default allreducers;
