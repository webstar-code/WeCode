import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import isAuthenticated from '../redux/actions/isAuthenticated';

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