import React, { useEffect } from 'react';
import AppBar from './AppBar'
import Bottom from './BottomNav'
import { ReactComponent as Profileicon } from './icons/account_circle.svg'
import { useDispatch, useSelector } from 'react-redux'
import getUserProfile from '../redux/actions/getUserProfile'

import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

const Get_USERPROFILE = gql`
    query GET_USERPROFILE ($displayname: String){
        user (displayname: $displayname) {
            Userid,
             name,
             displayname,
             about,
             profession,
             university
        }
    }



`;

const Profile = ({ match }) => {
    const loggedIn = useSelector(state => state.loggedIn);

    const displayname = match.params.name;

    const { loading, data, error} = useQuery(Get_USERPROFILE, {
        variables: { displayname }
    });
    console.log(data);
    return (

        <>
        { data ? 
            <div className="container">
                <div className="grid grid-cols-3 bg-blue-gray-300">
                    <Profileicon className="w-2/5 h-auto col-span-1"></Profileicon>
                    <div className="col-span-2">
                        <h2>{data.user.displayname}</h2>
                        <h4>{data.user.name}</h4> 
                        {loggedIn && data.user.Userid === loggedIn.data._id ? <p>Edit</p> : null }
                    </div>
                    <div className="col-span-3">
                        <p className="">{data.user.about}</p>
                    </div>
                </div>


            </div>
: <p>loading.....</p>}
        </>

    )
}

export default Profile;