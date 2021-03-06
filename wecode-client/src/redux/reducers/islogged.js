
const loggedState = {
    loading: false,
    data: [],
    error: ''
}

const islogged = (state=loggedState, action) => {
    switch (action.type) {
        case 'FETCH_USER_REQUEST':
            return {
                ...state,
                loading: true
            }
        case 'FETCH_USER_SUCCESS':
            return {
                loading: false,
                data: action.payload,
                error: ''
            }
        case 'FETCH_USER_FAILURE':
            return {
                loading: false,
                data: '',
                error: action.payload
            }
        default:
            return state;
    }
}



export default islogged;