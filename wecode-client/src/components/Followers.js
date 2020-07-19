import React from 'react';
import { ReactComponent as Profileicon } from './icons/utilitiesicon/account_circle.svg';
import { Link } from 'react-router-dom'
import People from './People';
import { useState } from 'react';
import Following from './Following';
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const REMOVE_FOLLOWING = gql`
    mutation REMOVE_FOLLOWING($AdminUserid: String,$Userid: String, $displayname: String, $ProfileImgref: String) {
        Removefollowing(AdminUserid: $AdminUserid, Userid: $Userid, displayname: $displayname, ProfileImgref: $ProfileImgref) {
            Userid
        }
    }
`;

const Followers = (props) => {
    let localUserid = localStorage.getItem('Userid');
    const { AdminUser } = props.user;
    const followers = props.followers;
    const [followersData, setfollowersData] = useState(followers.map(obj => ({ ...obj })))
    const [Removefollowing] = useMutation(REMOVE_FOLLOWING);

    const RemoveFollowing = (user) => {
        Removefollowing({
            variables: {
                AdminUserid: AdminUser.Userid,
                Userid: user.Userid,
                displayname: user.displayname
            }
        })
    }


    return (
        <div className="px-2">
            {followersData ? followersData.map(user => (
                <>
                    <div className="flex items-center my-3">
                        <div className="w-12 h-12 mr-2">
                            {user.ProfileImgref ?
                                <img src={`/api/image/${user.ProfileImgref}`} alt="UserProfile Image"
                                    className="w-full h-full object-cover rounded-full" />

                                : <Profileicon className="w-full h-full object-cover rounded-full" />}
                        </div>
                        <h3 className="font-bold px-3"><Link to={`/profile/${user.displayname}`}>{user.displayname}</Link></h3>
                        <button className="btn rounded justify-end px-3 border border-black ml-auto" onClick={() => RemoveFollowing(user)}>Remove</button>
                    </div>
                </>
            ))

            : <div className="text-gray-600 text-2xl text-center"> No followers </div>
            }


        </div >
    )
}

export default Followers;
