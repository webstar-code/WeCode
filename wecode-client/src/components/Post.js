import React from 'react';
import AppBar from './AppBar';
import BottomNav from './BottomNav';
import { ReactComponent as AddImageicon } from './icons/photo.svg';
import { ReactComponent as Profileicon} from './icons/account_circle.svg'

const Post = () => {
    return(
        <>
        <AppBar />
        <div className="">
            <div className="flex justify-between shadow p-2">
                <h3>New Post</h3>
                <h3 className="text-blue-500">Share</h3>
            </div>

            <AddImageicon className="w-2/5 h-auto mx-auto my-6"></AddImageicon> 
            <div className="flex p-2">
                <Profileicon className="w-16 h-auto"/>
            <input name="caption" placeholder="Write a caption..." className=" w-4/5 border-b-2 outline-none pl-2 text-xl break-words over break-all"></input>
            </div>


        </div>

        <BottomNav />
        </>
    )
}

export default Post;