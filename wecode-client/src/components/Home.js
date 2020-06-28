import React from 'react';
import AppBar from './AppBar'
import BottomNav from './BottomNav'
 
import Post from './Post'
import Question from './Question'


const Home = () => {
    return(
        <div className="">
            <AppBar />

            <div className="">
                <Post />
                <Question />
                <Question />
                <Post />

            </div>

            <BottomNav />
        </div>


    )
}

export default Home;