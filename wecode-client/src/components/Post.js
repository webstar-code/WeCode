import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import { ReactComponent as Profileicon } from './icons/utilitiesicon/account_circle.svg'
import { ReactComponent as Postmenu } from './icons/utilitiesicon/postmenu.svg'

import EditPost from './EditPost';

import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import moment from 'moment';
import { useEffect } from 'react';

const CREATE_LIKES = gql`
    mutation CREATE_LIKES($_id: String, $Userid: String) {
        like (_id: $_id, Userid: $Userid) {
            Userid,
        }
    }
`

const REMOVE_LIKES = gql`
        mutation REMOVE_LIKES($_id: String, $Userid: String) {
            Removelike (_id: $_id, Userid: $Userid) {
                Userid,
            }
        }

`




const Post = (props) => {
    const { post } = props;
    console.log(post.likes.length);
    // console.log(post._id, post.Userid, post.likes);
    // const [likes, setlikes] = useState(post.likes);
    const [liked, setliked] = useState(false);
    const [createlikes] = useMutation(CREATE_LIKES);
    const [Removelike] = useMutation(REMOVE_LIKES);

    const [showDialogbox, setshowDialogbox] = useState(false);
    const AddLike = () => {
        setliked(true);
        createlikes(
            {
                variables: {
                    _id: post._id,
                    Userid: post.Userid,
                },
            })

        // Later use Promises to handle the delay of below function
    }

    const RemoveLike = () => {
        setliked(false);
        Removelike(
            {
                variables: {
                    _id: post._id,
                    Userid: post.Userid,
                },
            })

    }

    const CheckLiked = () => {
        post.likes.map(user => {
            if (user.Userid === localStorage.getItem('Userid')) {
                setliked(true);
            } else {
                setliked(false);
            }
        })
    }

    useEffect(() => {
        CheckLiked();
    }, []);
    let timepassed = moment(post.createdAt).fromNow();
    let postTime = post.createdAt.substr(0, 10).replace(/-/g, ',');
    let nowtime = moment().format('YYYY MM DD');
    let daysdiff = moment(postTime).diff(nowtime.replace(/ /g, ','));

    // console.log(showDialogbox);
    const AddDialog = () => {
        setshowDialogbox(!showDialogbox)
    }




    return (
        <>
            {
                showDialogbox ?
                    <EditPost post={post} />
                    : null
            }
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
                        {post.Userid === localStorage.getItem('Userid') ?
                            <Postmenu className="ml-auto w-4 h-auto" onClick={() => AddDialog()} />
                            : null}
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

                        {liked ?
                            <div className="bg-blue-500" onClick={() => RemoveLike()}>liked {post.likes.length}</div>
                            :
                            <div className="" onClick={() => AddLike()}>like  {post.likes.length}</div>

                        }



                        <Link to="/comments/12345"><div className="">comments </div></Link>
                        <div className="like">share </div>
                    </div>

                    {post.PostImgref ?
                        <div className="flex py-2">
                            <span className="font-bold pr-2">{post.displayname}</span>
                            <p>{post.caption}</p>
                        </div>
                        :
                        null
                    }
                    <div className="py-4 text-gray-500 text-sm">
                        <span className="text-sm">      {(timepassed.split(' ')[1] === "days" && timepassed.split(' ')[0] > 7) ||
                            timepassed.split(' ')[1] === "months"
                            ? moment()
                                .subtract(daysdiff, "days")
                                .format("DD MMM YY")
                            : timepassed
                        }</span>
                    </div>
                </div>
                : null}
        </>

    )
}

export default Post;