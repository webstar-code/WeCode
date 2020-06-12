import React, { useEffect } from 'react';
import isAuthenticated from '../redux/actions/isAuthenticated'
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';

const ProtectedRoute = (props) => {
    const Component = props.component;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(isAuthenticated());

    },[]);
    const state = useSelector(state => state.islogged);

    return(
       <>
        {state ? <Component /> : <Redirect to="/signin"></Redirect>}
       </>
    )
}

export default ProtectedRoute;