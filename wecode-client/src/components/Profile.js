import React, { useEffect, useState } from 'react';
import AppBar from './AppBar'
import Bottom from './BottomNav'
import { ReactComponent as Profileicon } from './icons/account_circle.svg'
import { useDispatch, useSelector } from 'react-redux'
import getUserProfile from '../redux/actions/getUserProfile'
import BottomNav from './BottomNav';


const Profile = ({ match }) => {
    const [show, setShow] = useState(false);
    const name = match.params.name;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUserProfile(name));
    }, []);

    const state = useSelector(state => state.userprofile);
    console.log(state);
    const user = state.data != null ? state.data.user : null;
    console.log(user);

    const ShowMore = () => {
        setShow(!show);
    }

    return (

        <>
            {state.data ?
                <div className="container p-3">
                    <div className="grid grid-cols-3 items-center">
                        <Profileicon className="w-4/5 h-auto col-span-1"></Profileicon>
                        <div className="col-span-2">
                            <h2 className="text-4xl font-bold">{user.displayname}</h2>
                            <h4 className="text-md">{user.name}</h4>
                        </div>
                        <div className="col-span-3">
                            <p className="text-center text-xl">{user.about}</p>
                        </div>
                    </div>
                    {show ? 
                    <div className="flex flex-col p-3 w-4/5 mx-auto">
                        <div>
                            <span className="text-sm text-gray-500">Profession</span>
                            <p className="text-xl">{user.profession}</p>
                        </div>
                        <div>
                            <span className="text-sm text-gray-500">Education</span>
                            <p className="text-xl">{user.university}</p>
                        </div>
                    </div>
                    : null }
                    <div className="w-full mx-auto text-center text-blue-500 p-2" onClick={() => ShowMore()}>Show more..</div>

                </div>
                :
                <div className="text-red-900 text-2xl text-center">
                    Something went wrong
                </div>
            }

            <BottomNav />
        </>

    )
}

export default Profile;