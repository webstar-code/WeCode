import React from 'react';
import AppBar from './AppBar';
import BottomNav from './BottomNav';
import { ReactComponent as AddImageicon } from './icons/photo.svg';
import { ReactComponent as Profileicon } from './icons/account_circle.svg'
import { ReactComponent as Backicon } from './icons/back.svg'

import { useHistory } from 'react-router-dom';
import { useState } from 'react';


const CreatePost = () => {
    const [template, settemplate] = useState(false);
    const [bgcolor, setbgcolor] = useState('bg-white');
    const history = useHistory();

    const Goback = () => {
        history.goBack();
    }

    const changebg = (color) => {
        settemplate(true);
        setbgcolor(color);

        if (color === 'bg-white') {
            settemplate(false);
        }
    }


    return (
        <>
            <div className="">
                <div className="flex shadow px-2 py-3 bg-blue-gray text-white">
                    <Backicon className="w-16 h-auto px-4  stroke-current fill-current text-white" onClick={() => Goback()} />

                    <h3 className="font-bold text-xl">New Post</h3>
                </div>

                <div className=" flex-col h-full">
                    <div className="flex p-3">
                        <Profileicon className="w-16 h-auto " />
                        <p className="py-3">Webstar</p>
                    </div>

                    <div id="bgstyle" className={` flex align-center justify-center ${bgcolor} p-3 text-2xl `}>
                        <textarea rows="7" className={`overflow-auto w-11/12 border-none outline-none text-xl bg-transparent 
                        ${template ? "text-center self-center font-bold" : null} 
                        ${(bgcolor == "bg-blue-gray" || bgcolor === "bg-gradient-dblue" || bgcolor === "bg-gradient-pinkblue") ? "text-white" : null}
                        `} placeholder="Share coding tips, articles, snippets and anything code related"></textarea>
                    </div>

                </div>

                <div className="flex-col bottom-0 absolute w-screen p-3">
                    <div className="flex justify-around border-b border-black py-2">
                        <span id="colors" className="w-6 h-6 rounded bg-white border" onClick={() => changebg('bg-white')}></span>
                        <span className="w-6 h-6 rounded bg-blue-gray border" onClick={() => changebg('bg-blue-gray')}></span>
                        <span className="w-6 h-6 rounded bg-red-500 border" onClick={() => changebg('bg-red-500')}></span>
                        <span className="w-6 h-6 rounded bg-teal-500 border" onClick={() => changebg('bg-teal-500')}></span>
                        <span className="w-6 h-6 rounded bg-gradient-pinkblue border" onClick={() => changebg('bg-gradient-pinkblue')}></span>
                        <span className="w-6 h-6 rounded bg-gradient-gray border" onClick={() => changebg('bg-gradient-gray')}></span>
                        <span className="w-6 h-6 rounded bg-lighblue border" onClick={() => changebg('bg-gradient-lightblue')}></span>
                        <span className="w-6 h-6 rounded bg-gradient-dblue border" onClick={() => changebg('bg-gradient-dblue')}></span>
                        <span className="w-6 h-6 rounded bg-gradient-orange border" onClick={() => changebg('bg-gradient-orange')}></span>
                        <span className="w-6 h-6 rounded bg-gradient-bluered foo border" onClick={() => changebg('bg-gradient-bluered')}></span>


                    </div>

                    <div className="flex justify-between">
                        <div className="flex align-middle">
                            <span className="text-gray-500 mr-3 self-center">insert</span>
                            <label htmlFor="file-input" className="self-center"><AddImageicon className="w-6 h-auto cursor-pointer" /></label>
                            <input id="file-input" type="file" className="hidden" />
                        </div>
                        <button className="btn px-2 py-3 mr-3">POST</button>
                    </div>
                </div>

            </div>


        </>
    )
}

export default CreatePost;