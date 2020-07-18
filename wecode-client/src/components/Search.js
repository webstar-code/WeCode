import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Searchicon } from './icons/Navicons/search.svg';
import { ReactComponent as Profileicon } from './icons/utilitiesicon/account_circle.svg';

const GETUSERS = gql`
    {
        users {
            ProfileImgref,
            displayname,
            Userid
        }
    }

`;
const GET_USER = gql`
    query GET_USER($Userid: String){
        user (Userid: $Userid) {
            displayname,
            ProfileImgref,
            following {
                Userid,
                displayname,
                ProfileImgref
            },
            followers {
                Userid,
                displayname,
                ProfileImgref
            }
        }
    }

`;

const ADD_FOLLWING = gql`
    mutation ADD_FOLLOWING(
        $AdminUserid: String, $Admindisplayname: String, $AdminProfileImgref: String,
        $Userid: String, $displayname: String, $ProfileImgref: String) {

        Addfollowing(AdminUserid: $AdminUserid, Admindisplayname: $Admindisplayname,AdminProfileImgref: $AdminProfileImgref, 
            Userid: $Userid, displayname: $displayname, ProfileImgref: $ProfileImgref) {
            Userid
        }
    }
`;


const REMOVE_FOLLOWING = gql`
    mutation REMOVE_FOLLOWING($AdminUserid: String,$Userid: String, $displayname: String, $ProfileImgref: String) {
        Removefollowing(AdminUserid: $AdminUserid, Userid: $Userid, displayname: $displayname, ProfileImgref: $ProfileImgref) {
            Userid
        }
    }
`;

const Search = () => {
    const [follows, setfollows] = useState('');
    // Current UserData for Checking following list
    let localUserid = localStorage.getItem('Userid');

    const { data: UserData, } = useQuery(GET_USER, {
        variables: { Userid: localUserid },
    });
    // console.log(UserData);
    const Check_Already_Follows = (displayname) => {
        let value = false;
        UserData.user.following.forEach((x) => {
            if(x.displayname === displayname) {
                value = true;
                return;
            }
        })
        return value
    }

    const { loading, data: AllUsersData, error } = useQuery(GETUSERS);
    console.log(AllUsersData);
    const [Addfollowing] = useMutation(ADD_FOLLWING);
    const [Removefollowing] = useMutation(REMOVE_FOLLOWING);

    const AddFollowing = (user) => {

        Addfollowing({
            variables: {
                AdminUserid: localUserid,
                Admindisplayname: UserData.user.displayname,
                AdminProfileImgref: UserData.user.ProfileImgref,
                Userid: user.Userid,
                displayname: user.displayname,
                ProfileImgref: user.ProfileImgref
            }
        })
    }

    const RemoveFollowing = (user) => {
        Removefollowing({
            variables: {
                AdminUserid:  localUserid,
                Userid: user.Userid,
                displayname: user.displayname
            }
        })
    }
    return (

        <>

            <div className="container px-3 mb-16">
                <div className="flex rounded border border-black p-2 my-2">
                    <Searchicon className="w-6 h-auto" />
                    <input type="text" name="search" placeholder="Search" className=" w-4/5 border-b-2 outline-none pl-2 text-md"></input>
                </div>

                <div className="">
                    {AllUsersData && AllUsersData.users ? AllUsersData.users.map((user) => {
                        return (
                            <div className="flex items-center my-3">
                                <div className="w-12 h-12 mr-2">
                                    {user.ProfileImgref ?
                                        <img src={`/api/image/${user.ProfileImgref}`} alt="UserProfile Image"
                                            className="w-full h-full object-cover rounded-full" />

                                        : <Profileicon className="w-full h-full object-cover rounded-full" />}
                                </div>
                                <h3 className="font-bold px-3"><Link to={`/profile/${user.displayname}`}>{user.displayname}</Link></h3>
                                {UserData && Check_Already_Follows(user.displayname) ?
                                    <button className="btn rounded justify-end px-3 border border-black ml-auto" onClick={() => RemoveFollowing(user)}>Following</button>
                                    :
                                    <button className="btn rounded justify-end px-3 bg-blue-500 ml-auto" onClick={() => AddFollowing(user)}>Follow</button>
                                }
                            </div>
                        )
                    }) : loading ? <div>Loading</div>
                            : error ? <div className="text-red-900 text-2xl text-center"> Something went wrong</div>
                                : null
                    }



                </div>
            </div>
        </>
    )
}

export default Search;