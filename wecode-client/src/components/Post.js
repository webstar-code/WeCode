import React from 'react';
import { ReactComponent as Profileicon } from './icons/account_circle.svg'

const Post = () => {
    return (
        <div className="w-full flex-col">
            <div className="flex text-sm font-bold p-2">
                <Profileicon className="w-12 px-1" />
                            webstar
                            </div>
            <div className="h-64 bg-black"></div>
            <div className="flex justify-around border-b-2 py-2">
                <div className="">like </div>
                <div className="like">comment </div>
                <div className="like">share </div>
            </div>
            <div className="flex py-2">
                <span className="font-bold pr-2">webstar</span>
                <p>this is my first post and awesome post.</p>
            </div>
            <div className="py-4 text-gray-500 text-sm">
                <span className="text-sm">2 July 2020</span>
            </div>

        </div>

    )
}

export default Post;