import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Profileicon } from './icons/utilitiesicon/account_circle.svg'
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

const CREATE_LIKES = gql`
    mutation CREATE_LIKES($_id: String, $Userid: String, $likes: Int) {
        like (_id: $_id, Userid: $Userid, likes: $likes) {
            _id,
            Userid,
            likes
        }
    }

`


const Post = (props) => {
    const { post } = props;
    console.log(post._id, post.Userid, post.likes);
    const [likes, setlikes] = useState(post.likes);
    const [liked, setliked] = useState(false);
    const [createlikes] = useMutation(CREATE_LIKES);
    console.log(likes);
    const IncLikes = () => {

        if (liked) {
            setlikes(likes - 1);
            setliked(false)
        } else {
            setlikes(likes + 1);
            setliked(true);
        }
        // Later use Promises to handle the delay of below function
        setTimeout(() => {
            createlikes(
                {
                    variables: {
                        _id: post._id,
                        Userid: post.Userid,
                        likes: likes,
                    },
                })

        }, 2000)
    }





    return (
        <>
            {post ?
                <div className="w-full flex-col">
                    <div className="flex items-center text-sm font-bold p-2">
                        <div className="w-4 h-4 mr-2">
                            {post.ProfileImgref ?
                                <img src={`/api/image/${post.ProfileImgref}`} alt="UserProfile Image" id="ProfileImgPreview"
                                    className="w-full h-full object-cover rounded-full" />
                                : 'X'}
                        </div>
                        {post.displayname}
                    </div>
                    {post.PostImgref ?
                        <img src={`/api/image/${post.PostImgref}`} />
                        :
                        <div className={`h-64 ${post.bgcolor} flex justify-center items-center text-2xl font-bold
                        ${(post.bgcolor == "bg-blue-gray" || post.bgcolor === "bg-gradient-dblue" || post.bgcolor === "bg-gradient-pinkblue") ? "text-white" : null}
                        `}>
                            {post.caption}
                        </div>

                    }


                    <div className="flex justify-around border-b-2 py-2">
                        <div className="" onClick={() => IncLikes()}>like {likes} </div>
                        <Link to="/comments/12345"><div className="">comments </div></Link>
                        <div className="like">share </div>
                    </div>

                    {post.PostImgref ? null
                        :
                        <div className="flex py-2">
                            <span className="font-bold pr-2">{post.displayname}</span>
                            <p>{post.caption}</p>
                        </div>
                    }
                    <div className="py-4 text-gray-500 text-sm">
                        <span className="text-sm">2 July 2020</span>
                    </div>
                </div>
                : null}
        </>

    )
}

export default Post;