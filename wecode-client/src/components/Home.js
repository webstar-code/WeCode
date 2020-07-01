import React from 'react';
import AppBar from './AppBar'
import BottomNav from './BottomNav'
import { ReactComponent as Profileicon } from './icons/Navicons/account_circle.svg';
 
import Post from './Post'
import Question from './Question'


const Home = () => {
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
                <Post />
                <Question />
                <Question />
                <Post />

            </div>

        </div>


    )
}

export default Home;