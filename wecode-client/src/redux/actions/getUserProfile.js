import { FETCH_USERPROFILE_REQUEST, FETCH_USERPROFILE_SUCCESS, FETCH_USERPROFILE_FAILURE } from '../actions/fetchaction'

const getUserProfile = (loading,data,error) => {
    return function (dispatch) {

      console.log("hello");
        console.log(data);
    
        if(loading) {
            dispatch(FETCH_USERPROFILE_REQUEST());
        }
        if(data) {
            dispatch(FETCH_USERPROFILE_SUCCESS(data));
        }
        if(error) {
            dispatch(FETCH_USERPROFILE_FAILURE(error));
        }


    }
}

export default getUserProfile;