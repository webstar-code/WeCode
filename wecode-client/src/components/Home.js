import React from 'react';
import AppBar from './AppBar'
import BottomNav from './BottomNav'
import { ReactComponent as Profileicon } from './icons/Navicons/account_circle.svg';
import { useQuery } from '@apollo/react-hooks';

import gql from 'graphql-tag';

import Post from './Post'
import Question from './Question'

const GET_USER = gql`
    query GET_USER($Userid: String){
        user (Userid: $Userid) {
            timeline {
                _id,
                Userid,
                displayname,
                PostImgref,
                ProfileImgref
                likes {
                    Userid
                }
                bgcolor,
                caption,
                createdAt
            }
        }
    }

`;

const Home = () => {
    let localUserid = localStorage.getItem('Userid');
    const { data } = useQuery(GET_USER, {
        variables: { Userid: localUserid },
    });
    console.log(data);
    return (
        <div className="mb-16">
            <div className="flex overflow-x-auto">
                <Profileicon className="w-24 mx-2 h-auto" />
                <Profileicon className="w-24  mx-2 h-auto" />
                <Profileicon className="w-24 mx-2 h-auto" />
                <Profileicon className="w-24 mx-2 h-auto" />
                <Profileicon className="w-24 mx-2 h-auto" />
                <Profileicon className="w-24 mx-2 h-auto" />
                <Profileicon className="w-24 mx-2 h-auto" />
                <Profileicon className="w-24 mx-2 h-auto" />

                <Profileicon className="w-24 mx-2 h-auto" />

            </div>

            <div className="">
                {data ? data.user.timeline.map(timeline => (
                    <Post post={timeline} />
                ))
                : null}
                
                </div>

        </div>


    )
}

export default Home;