import { FETCH_USER_REQUEST, FETCH_USER_SUCCESS, FETCH_USER_FAILURE } from '../actions/fetchaction'

const getUsers = () => {
    return function(dispatch) {
        dispatch(FETCH_USER_REQUEST());
        fetch('/api/search')
        .then(res => res.json())
        .then(data => {
            console.log(data);
            dispatch(FETCH_USER_SUCCESS(data));

        })
        .catch(err => {
            dispatch(FETCH_USER_FAILURE(err));
        })
    }
}

export default getUsers;