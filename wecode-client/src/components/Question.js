import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Profileicon } from './icons/utilitiesicon/account_circle.svg'

import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import moment from 'moment';

const CREATE_LIKES = gql`
    mutation CREATE_LIKES($_id: String, $Userid: String) {
        like (_id: $_id, Userid: $Userid, contentType: "question") {
            Userid,
        }
    }
`

const REMOVE_LIKES = gql`
        mutation REMOVE_LIKES($_id: String, $Userid: String) {
            Removelike (_id: $_id, Userid: $Userid, contentType: "question") {
                Userid,
            }
        }

`
const Question = (props) => {
    const Render = props.Render
    const question = props.question;
    console.log(question);
    const [Renderin, setrender] = useState('long')
    const [liked, setliked] = useState(false);
    const [createlikes] = useMutation(CREATE_LIKES);
    const [Removelike] = useMutation(REMOVE_LIKES);

    const AddLike = () => {
        setliked(true);
        createlikes(
            {
                variables: {
                    _id: question._id,
                    Userid: question.Userid,
                },
            })

        // Later use Promises to handle the delay of below function
    }

    const RemoveLike = () => {
        setliked(false);
        Removelike(
            {
                variables: {
                    _id: question._id,
                    Userid: question.Userid,
                },
            })

    }

    const CheckLiked = () => {
        if( question && question.stars) {
            question.stars.map(user => {
                if (user.Userid === localStorage.getItem('Userid')) {
                    setliked(true);
                } else {
                    setliked(false);
                }
            })
        }
        
    }

    useEffect(() => {
        CheckLiked();
    }, []);
    return (

        <>
            {question ?
                <div className="w-full flex-col shadow border-black-900 my-2">
                    <div className="flex text-sm font-bold py-2">
                        <Profileicon className="w-12" />
                        {props.displayname}
                        <div className="text-gray-500 text-xsm px-2">{question.createAt}</div>

                    </div>
                    <div className=" px-3">
                        <p className="font-medium text-xl">{question.question}</p>
                        {Renderin === 'long' ? <p className="text-sm">{question.description}</p>

                            :
                            <p className="text-sm h-16 overflow-hidden">{question.description}</p>
                        }
                    </div>
                    <div className="flex flex-wrap py-2 text-sm">
                        {question.tags ? question.tags.map(tag =>
                            (
                                <span className="bg-gray-600 text-white px-3 py-1 self-center py-1 rounded-full mx-2 mb-2">{tag}</span>

                            )
                        ) : null}
                    </div>


                    <div className="flex justify-around py-2">
                    {liked ?
                            <div className="bg-blue-500" onClick={() => RemoveLike()}>liked {question.stars.length}</div>
                            :
                            <div className="" onClick={() => AddLike()}>like  {question.stars.length}</div>

                        }
                        <Link to="/discussion/56789"><div className="like">discuss</div></Link>
                    </div>

                </div>
                : null}

        </>
    )


}

export default Question