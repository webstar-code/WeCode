import React from 'react';
import { ReactComponent as Profileicon } from './icons/utilitiesicon/account_circle.svg';
import { Link } from 'react-router-dom'
import People from './People';
import { useState } from 'react';
import Following from './Following';

const DBData = [{ displayname: 'webstar' },
{ displayname: 'Jogn' },
{ displayname: 'Sven' },
{ displayname: 'Joergon' },
{ displayname: 'Ikea' },
{ displayname: 'Pew' }]


const Followers = () => {
    const [FollowersData, setFollowersData] = useState([...DBData])

    const RemoveFollower = (follower) => {
            let index = DBData.findIndex(x => x.displayname === Following.displayname);
            if(index != 1) {
                DBData.splice(index, 1);
            } 

           setFollowersData([...DBData]);
       }

    



    return (
        <div className="px-2">
            {FollowersData ? FollowersData.map(follower => (
                <>
                    <div className="" >
                        <div className="flex items-center my-3">
                            <Profileicon className="w-16 h-auto" />
                            <h3 className="font-bold px-3">{follower.displayname}</h3>
                            <button className="btn rounded-lg justify-end px-3 border-black border ml-auto font-medium outline-none" onClick={() => RemoveFollower(follower)}>remove</button>
                        </div>
                    </div>
                </>

            )) : null}



        </div >
    )
}

export default Followers;
