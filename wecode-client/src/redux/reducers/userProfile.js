
const UserProfileState = {
    loading: false,
    data: null,
    error: ''
}

const UserProfile = (state=UserProfileState, action) => {
    switch (action.type) {
        case 'FETCH_USERPROFILE_REQUEST':
            return {
                ...state,
                loading: true
            }
        case 'FETCH_USERPROFILE_SUCCESS':
            return {
                loading: false,
                data: action.payload,
                error: ''
            }
        case 'FETCH_USERPROFILE_FAILURE':
            return {
                loading: false,
                data: '',
                error: action.payload
            }
        default:
            return state;
    }
}



export default UserProfile;