import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { animated, useSpring } from 'react-spring';
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

import isAuthenticated from '../redux/actions/isAuthenticated';
import getUserProfile from '../redux/actions/getUserProfile';
import { ReactComponent as Profileicon } from './icons/utilitiesicon/account_circle.svg';
import { ReactComponent as DownArrow } from './icons/utilitiesicon/downarrow.svg';
import { ReactComponent as Editicon } from './icons/utilitiesicon/edit.svg';
import { ReactComponent as UpArrow } from './icons/utilitiesicon/uparrow.svg';
import Post from './Post';
import Question from './Question';

const Get_USERPROFILE = gql`
query GET_USERPROFILE ($displayname: String){
    user (displayname: $displayname) {
        
        Userid,
        name,
        displayname,
        about,
        profession,
        education,
        ProfileImgref,
        timeline {
            Userid
            caption
            displayname
        }
        post {
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

        },
        question {
            _id
            Userid,
            displayname,
            question
            description
            stars {
                Userid
            }
            tags
            createdAt
        }
        following {
            displayname
        },
        followers {
            displayname
        }
    }
}
`;



const Profile = ({ match }) => {
    const displayname = match.params.name;

    const [show, setshow] = useState(false);
    const [postview, setpostview] = useState(true);
    let localUserid = localStorage.getItem('Userid')
    // GEtting loggedIn data
    const { loading, data, error, refetch } = useQuery(Get_USERPROFILE, {
        variables: { displayname },

    });
    // functions for more info on profile
    const showMore = () => {
        setshow(!show);
    }
    const showPost = () => {
        setpostview(true);
    }
    const hidePost = () => {
        setpostview(false);
    }
    const showporps = useSpring({
        marginTop: show ? 0 : -180,
        // transform: show ? "translate3D(0,0,0)" : "translate3D(0,-40px,0)",
        opacity: show ? 1 : 0,
        from: { opacity: 0, marginTop: -100 }
    });


    return (

        <div>

            {data && data.user ?

                <div className="container mb-16">

                    <div className="grid grid-cols-3 bg-blue-gray-300 mt-3">
                        <div className="w-16 h-16 ml-4">
                            <img src={`/api/image/${data.user.ProfileImgref}`} alt="UserProfile Image" id="ProfileImgPreview"
                                className="w-full h-full mx-auto object-cover rounded-full" />
                        </div>
                        <div className="flex col-span-2 self-center justify-between -ml-8">
                            <div className="flex-col">
                                <h2 className="text-2xl font-semibold m-0 p-0">{data.user.displayname}</h2>
                                <h4 className="text-xl font-light" >{data.user.name}</h4>
                            </div>

                            {data.user.Userid === localUserid ?
                                <Link to="/editprofile" className="flex items-center border border-black rounded px-2 text-sm mt-2 mr-2 h-8">
                                    <Editicon className="w-6 h-auto px-1" />
                            Edit Profile</Link>
                                : null}

                        </div>

                        <div className="col-span-3 flex-col ml-4 my-3">
                            <p className="">{data.user.about}</p>
                            <p className="">{data.user.profession}</p>
                            <p className="">{data.user.education}</p>
                        </div>
                        {/* <div className="col-span-3 flex flex-col mx-12 my-3">
                            <animated.div style={showporps} className="flex flex-col">
                                <span className="text-gray-500 text-sm">Profession</span>
                                <p className="mb-3 ">{data.user.profession}</p>
                                <span className="text-gray-500 text-sm">Education</span>
                                <p className="mb-3 ">{data.user.education}</p>
                            </animated.div> */}

                            {/* {show ?
                                <div className="flex justify-center text-sm text-center text-blue-500" onClick={() => showMore()}>
                                    <UpArrow className="w-3 mx-1" />show less...
                                    </div>
                                : <div className="flex justify-center text-sm text-center text-blue-500" onClick={() => showMore()}>
                                    <DownArrow className="w-3 mx-1" />show More...</div>} */}
                        {/* </div> */}

                        <div className="text-sm col-span-1 text-center font-medium">{data.user.post.length ? data.user.post.length : '0'} Posts</div>
                        <div className="text-sm col-span-1 text-center font-medium"><Link to={`/${data.user.displayname}/people`}>{data.user.following.length ? data.user.following.length : '0'} Following</Link></div>
                        <div className="text-sm col-span-1 text-center font-medium"><Link to={`/${data.user.displayname}/people`}>{data.user.followers.length ? data.user.followers.length : '0'} Followers</Link></div>
                    </div>

                    <div className="flex justify-center  border-t-2 border-b-2 mt-2">
                        <div className={`w-3/6 text-center py-3 ${postview ? "border-b-2 border-blue-900" : ""}`} onClick={() => showPost()}>Post</div>
                        <div className={`w-3/6 text-center py-3 ${!postview ? "border-b-2 border-blue-900" : ""}`} onClick={() => hidePost()}>Questions</div>
                    </div>



                    {postview ?
                        <div className="container">
                            {data.user.post.map(post => (
                                <Post post={post} displayname={data.user.displayname} />
                            )
                            )}
                            {/* 
                                <Post />
                                <Post /> */}

                        </div>

                        :
                        <div className="">
                            {data.user.question.map(question => (
                            <Question  question={question} displayname={data.user.displayname} ProfileImgref={data.user.ProfileImgref}/>

                            ))
                        }
                     

                        </div>
                    }

                </div>
                : <p>loading.....</p>}

        </div>

    )
}

export default Profile;