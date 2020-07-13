import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Profileicon } from './icons/utilitiesicon/account_circle.svg'

const Post = (props) => {
    const { post } = props;
    
    return (
        <>
        { post ? 
        <div className="w-full flex-col">
             <div className="flex text-sm font-bold p-2">
                <Profileicon className="w-12 px-1" />
                            {post.displayname}
                            </div>
                {post.PostImgref ? 
                <img src={`/api/image/${post.PostImgref}`} />
            : null}
                
                
                
                
                <div className="flex justify-around border-b-2 py-2">
                    <div className="">{post.like ? post.like : 0} </div>
                    <Link to="/comments/12345"><div className="">comments </div></Link>
                    <div className="like">share </div>
                </div>
                <div className="flex py-2">
        <span className="font-bold pr-2">{post.displayname}</span>
        <p>{post.caption}</p>
                </div>
                <div className="py-4 text-gray-500 text-sm">
                    <span className="text-sm">2 July 2020</span>
                </div>
        </div>
        : null }
        </>

    )
}

export default Post;