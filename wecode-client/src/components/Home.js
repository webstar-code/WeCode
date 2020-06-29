import React from 'react';
import AppBar from './AppBar'
import BottomNav from './BottomNav'
 
import Post from './Post'
import Question from './Question'


const Home = () => {
    return(
        <div className="mb-16">

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