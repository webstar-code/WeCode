import React from 'react';
import { ReactComponent as Backicon } from './icons/utilitiesicon/back.svg'
import Question from './Question';
import { ReactComponent as Profileicon } from './icons/utilitiesicon/account_circle.svg'
import Reply from './Reply'
import Discussion from './Discussion';
import { useState } from 'react';
import { useEffect } from 'react';
const Comments = () => {
    const [stopml, setstopml] = useState(false);



    const discussions = [
        {
            name: 'bhavesh',
            comment: "this is awesiome post",
            likes: '2',
            createAt: '2 July 2002',
            reply: [
                {
                    name: 'bhavesh',
                    comment: "this is awesiome post",
                    createAt: '2 Jusly 2002',
                    likes: '2',
                    reply: [
                        {
                            name: 'bhavesh',
                            comment: "this is awesiome post",
                            createAt: '2 Jusly 2002',
                            likes: '2',
                            reply: [
                                {
                                    name: 'bhavesh',
                                    comment: "this is awesiome post",
                                    createAt: '2 Jusly 2002',
                                    likes: '2',
                                    reply: [
                                        {
                                            name: 'bhavesh',
                                            comment: "this is awesiome post",
                                            createAt: '2 Jusly 2002',
                                            likes: '2',
                                            reply: [

                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]

        },
        {
            name: 'bhavesh',
            comment: "this is awesiome post",
            createAt: '2 Jusly 2002',
            likes: '2',
            reply: [
                {

                    name: 'bhavesh',
                    comment: "this is awesiome post",
                    createAt: '2 Jusly 2002',
                    likes: '2',
                    reply: [

                    ]

                }
            ]
        }


    ]

    // const Goback = () => {
    //     history.goBack();
    // }




    return (
        <>
            {discussions.map(discussion => (

                <div className="flex-col p-2 m-2 shadow" >
                    <div className="flex text-sm font-bold py-2 text-xs">
                        <Profileicon className="w-6 h-auto mr-2" />
                        <span className="">{discussion.name}</span>
                        <span className="text-gray-500 px-2">{discussion.createAt}</span>

                    </div>
                    <div className="text-sm">
                        {discussion.comment}

                        {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta saepe repudiandae
                     amet velit? Odio iusto autem laborum sequi asperiores enim pariatur temporibus
                     laboriosam! Saepe, ullam omnis? Incidunt rerum id itaque. */}
                    </div>
                    <div className="flex justify-between text-sm text-gray-500 py-2">
                        <div className="px-2">{discussion.comment}</div>
                        <div className="flex">
                            <div className="px-2">Likes {discussion.likes}</div>
                            <div className="px-2">reply</div>
                        </div>
                    </div>
                    {discussion.reply ? discussion.reply.map(reply => <Reply reply={reply} />) : null}

                </div>


            ))
            }

        </>
    )
}

export default Comments