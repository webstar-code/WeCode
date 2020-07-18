import React, { useState } from 'react';
import { ReactComponent as Profileicon } from './icons/utilitiesicon/account_circle.svg';
import { Link } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

// GET following List
// make a copy of it with One extra field , unfollow: false
// Unfollow: 
//          Take the User send to backend Dp RemoveFollowing mutation
// In Copy of Array make unfollow true
// Follow: 
//          take the user send to backend Do AddFollowing mutation

const ADD_FOLLWING = gql`
    mutation ADD_FOLLOWING($localUserid: String, $displayname: String, $ProfileImgref: String) {
        Addfollowing(Userid: $localUserid, displayname: $displayname, ProfileImgref: $ProfileImgref) {
            Userid
        }
    }
`;

const REMOVE_FOLLOWING = gql`
    mutation REMOVE_FOLLOWING($localUserid: String, $displayname: String) {
        Removefollowing(Userid: $localUserid, displayname: $displayname) {
            Userid
        }
    }
`;
const Following = (props) => {
    const [following] = props.following;
    const [followingData, setfollowingData] = useState(following.map(obj => ({ ...obj, unfollow: false })));
    console.log(followingData);
    console.log(following);
    let localUserid = localStorage.getItem('Userid');
    const [Addfollowing] = useMutation(ADD_FOLLWING);
    const [Removefollowing] = useMutation(REMOVE_FOLLOWING);

    const AddFollowing = (user) => {
        user.unfollow = false;
        setfollowingData([...followingData]);
        Addfollowing({
            variables: {
                localUserid: localUserid,
                displayname: user.displayname,
                ProfileImgref: user.ProfileImgref
            }
        })
    }

    const RemoveFollowing = (user) => {
        // save unfollow changes
        user.unfollow = true;
        setfollowingData([...followingData]);
        Removefollowing({
            variables: {
                localUserid: localUserid,
                displayname: user.displayname
            }
        })
    }
    return (
        <div className="p-2">
            {followingData ? followingData.map(user => {
                return (
                    <div className="flex items-center my-3">
                        <div className="w-12 h-12 mr-2">
                            {user.ProfileImgref ?
                                <img src={`/api/image/${user.ProfileImgref}`} alt="UserProfile Image"
                                    className="w-full h-full object-cover rounded-full" />

                                : <Profileicon className="w-full h-full object-cover rounded-full" />}
                        </div>
                        <h3 className="font-bold px-3"><Link to={`/profile/${user.displayname}`}>{user.displayname}</Link></h3>
                        {user.unfollow ?
                            <button className="btn rounded justify-end px-3 bg-blue-500 ml-auto" onClick={() => AddFollowing(user)}>Follow</button>

                            :
                            <button className="btn rounded justify-end px-3 border border-black ml-auto" onClick={() => RemoveFollowing(user)}>Following</button>
                        }



                    </div>
                )
            })


                : <p>Loading...</p>}

        </div>
    )
}

export default Following;
