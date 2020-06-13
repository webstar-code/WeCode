import React, { useEffect } from 'react';
import AppBar from './AppBar'
import Bottom from './BottomNav'
import { ReactComponent as Profileicon } from './icons/account_circle.svg'
import { useDispatch, useSelector } from 'react-redux'
import getUserProfile from '../redux/actions/getUserProfile'


const Profile = ({ match }) => {
    const name = match.params.name;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUserProfile(name));
    }, []);

    const state = useSelector(state => state.userprofile);
    console.log(state);
        const user = state.data != null ? state.data.user : null;
        console.log(user);
        
    return (

        <>
        {state.data ? 
         <div className="container">
         <div className="grid grid-cols-3 bg-blue-gray-300">
             <Profileicon className="w-2/5 h-auto col-span-1"></Profileicon>
             <div className="col-span-2">
        <h2>{user.displayname}</h2>
        <h4>{user.name}</h4> 
             </div>
             <div className="col-span-3">
        <p className="">{user.about}</p>
             </div>
         </div>


     </div>
     : 
     <div className="text-red-900 text-2xl text-center">
         Something went wrong
     </div>
}


        </>

    )
}

export default Profile;