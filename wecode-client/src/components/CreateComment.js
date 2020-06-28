import React from 'react';
import { useHistory } from 'react-router-dom'
import { ReactComponent as Closeicon } from './icons/utilitiesicon/close.svg'

const CreateComment = () => {

    const history = useHistory();
    const Goback = () => {
        history.goBack();
    }


    return (
        <div className="">
            <div className="flex shadow px-2 py-3 bg-blue-gray text-white justify-between">
                <div className="flex">
                <Closeicon className="w-12 h-auto px-4  stroke-current fill-current text-white" onClick={() => Goback()} />
                <h3 className="font-bold text-xl">Add Comment</h3>
                </div>
                <button className="btn">Post</button>
            </div>
            <textarea rows="7" className="overflow-auto w-11/12 border-none outline-none bg-transparent p-3 mt-2" placeholder="Your Comment"/> 

        </div>

    )

}

export default CreateComment;