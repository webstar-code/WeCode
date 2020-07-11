import React from 'react';
import AppBar from './AppBar'
import BottomNav from './BottomNav'
import { ReactComponent as Profileicon } from './icons/Navicons/account_circle.svg';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

import Post from './Post'
import Question from './Question'

const GET_TIMELINE = gql`
    query GET_TIMELINE($Userid: String) {
        
        timeline(Userid: $Userid) {
            timeline {
                displayname
                caption
                pid
              }
            
        }
    }
`;

const Home = () => {

    console.log(localStorage.getItem("Userid").toString());
    const {loading, data, error} = useQuery(GET_TIMELINE, {
        variables: {Userid: "5f032115e4f77e0f6851222e"}
    });
    console.log(data);
    return(
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
                {data ? data.timeline.timeline.map(timeline => (
                    <Post post={timeline} />
                ))
                : null}
            </div>

        </div>


    )
}

export default Home;