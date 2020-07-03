import React, { useState } from 'react';
import { ReactComponent as Profileicon } from './icons/utilitiesicon/account_circle.svg';
import { Link } from 'react-router-dom'

const DBData = [{ displayname: 'webstar' },
{ displayname: 'Jogn' },
{ displayname: 'Sven' },
{ displayname: 'Joergon' },
{ displayname: 'Ikea' },
{ displayname: 'Pew' }];


const Following = () => {
    const [followingData, setfollowingData] = useState(DBData.map(obj => ({ ...obj, unfollow: false })));

    const RemoveFollowing = (following) => {
        let index = DBData.findIndex(x => x.displayname === following.displayname)
        if (index != -1) {
            DBData.splice(index, 1);
        }
        following.unfollow = true
        setfollowingData([...followingData]);
    }

    const AddFollowing = (following) => {
        DBData.push({displayname: following.displayname});
        following.unfollow = false;
        setfollowingData([...followingData]);
    }

    return (
        <div className="p-2">
            {followingData ? followingData.map(following => (
                <div className="">
                    <div className="flex items-center my-3">
                        <Profileicon className="w-16 h-auto" />
                        <h3 className="font-bold px-3">{following.displayname}</h3>
                        {following.unfollow ?
                            <button className="btn rounded justify-end px-3 bg-blue-500 ml-auto" onClick={() => AddFollowing(following)}>follow</button>
                            :
                            <button className="btn rounded border-black border justify-end px-3 ml-auto" onClick={() => RemoveFollowing(following)}>following</button>

                        }

                    </div>
                </div>
            )) : null}

        </div>
    )
}

export default Following;
