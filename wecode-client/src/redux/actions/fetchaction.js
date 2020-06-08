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

