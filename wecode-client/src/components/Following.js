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
const GET_USERS = gql`
    {
        users {
            displayname
            ProfileImgref,
        }
    }

`;

const Following = () => {
    let localUserid = localStorage.getItem('Userid');
  const { data } = useQuery(GET_USERS, { variables: { Userid: localUserid } });
    console.log(data);
    // const [followingData, setfollowingData] = useState(DBData.map(obj => ({ ...obj, unfollow: false })));

    // const RemoveFollowing = (following) => {
    //     let index = DBData.findIndex(x => x.displayname === following.displayname)
    //     if (index != -1) {
    //         DBData.splice(index, 1);
    //     }
    //     following.unfollow = true
    //     setfollowingData([...followingData]);
    // }

    // const AddFollowing = (following) => {
    //     DBData.push({displayname: following.displayname});
    //     following.unfollow = false;
    //     setfollowingData([...followingData]);
    // }

    return (
        <div className="p-2">
            

        </div>
    )
}

export default Following;
