import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

const DELETE_POST = gql`
    mutation DELETE_POST($_id: String, $Userid: String){
        deletepost (_id: $_id, Userid: $Userid) {
            _id
        }
    }

`

const EditPost = (props) => {
    const { post } = props;
    console.log(post);
    const [show, setshow] = useState(false);
  const history = useHistory();

    useEffect(() => {
        setshow(!show);
    }, []);
    console.log(show);
    const [deletepost] = useMutation(DELETE_POST);

    const DeletePost = () => {
        setshow(!show); 
        deletepost({
            variables: {
                _id: post._id,
                Userid: post.Userid
            }
        })
        history.push(`/profile/${post.displayname}`);
    }


    return (
        <>
            {show ?
                <div className="w-full flex items-center justify-center h-full absolute z-index-10 top-0" style={{ backgroundColor: '#000000a1' }}>
                    <div className="flex flex-col items-center justify-center w-3/5 h-64 bg-white rounded-lg">
                        <button className="w-full text-xl font-meduim text-center border border-b py-2">Edit</button>
                        <button className="w-full text-xl font-meduim text-center border border-b py-2" onClick={() => DeletePost()}>Delete</button>
                        <button className="w-full text-xl font-meduim text-center border border-b py-2">Share</button>
                        <button className="w-full text-xl font-meduim text-center border border-b py-2" onClick={() => setshow(!show)}>cancel</button>
                    </div>
                </div>
                 : null}
        </>
    )
}

export default EditPost;