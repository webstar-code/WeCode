export const FETCH_USER_REQUEST = () => {
    return {
        type: 'FETCH_USER_REQUEST'
    }
}

export const FETCH_USER_SUCCESS = (data) => {
    return {
        type: 'FETCH_USER_SUCCESS',
        payload: data
    }
}

export const FETCH_USER_FAILURE = (error) => {
    return {
        type: 'FETCH_USER_FAILURE',
        payload: error
    }
}

export const FETCH_USERPROFILE_REQUEST = () => {
    return {
        type: 'FETCH_USERPROFILE_REQUEST'
    }
}

export const FETCH_USERPROFILE_SUCCESS = (data) => {
    return {
        type: 'FETCH_USERPROFILE_SUCCESS',
        payload: data
    }
}

export const FETCH_USERPROFILE_FAILURE = (error) => {
    return {
        type: 'FETCH_USERPROFILE_FAILURE',
        payload: error
    }
}



