import React, { useState, useRef } from 'react';
import AppBar from './AppBar';
import BottomNav from './BottomNav';
import { ReactComponent as Profileicon } from './icons/utilitiesicon/account_circle.svg'
import { ReactComponent as Backicon } from './icons/utilitiesicon/back.svg'
import { ReactComponent as Downicon } from './icons/utilitiesicon/down-arrow.svg'

import { useHistory } from 'react-router-dom';

import { useSpring, animated } from 'react-spring';

const CreateQuestion = () => {
    const [tags, settags] = useState(false);
    const [taginput, settaginput] = useState(null);
    const [Tag_placehoder, setTag_placehoder] = useState(true);
    const history = useHistory();

    const Goback = () => {
        history.goBack();
    }

    const Gohome = () => {
        history.push('/home');
    }

    const showTags = () => {
        settags(!tags);
    }

    const handleChange = (value) => {
        settaginput(value);
        console.log(taginput);
    }

    const addtags = (e) => {
        let value;
        if (e.innerText) {
            value = e.innerText;
            e.classList.add('bg-gray-900');

        } else {
            value = e;
        }
        setTag_placehoder(false);
        const tags = document.getElementById('tags');
        const tag = document.createElement('span')
        tag.innerHTML = value;
        const classes = ["bg-gray-900", "text-white", "px-2", "py-1", "self-center", "rounded-full", "m-1",]
        tag.classList.add(...classes);

        tags.appendChild(tag);
    }

    const downpropsicon = useSpring({
        transform: tags ? 'rotate(180deg)' : 'rotate(0deg)'
    })

    const AnimatedDownicon = animated(Downicon);

    return (
        <>
            {/* <AppBar /> */}
            <div className="">
                <div className="flex shadow px-2 py-3 bg-blue-gray text-white">
                    <Backicon className="w-16 h-auto px-4  stroke-current fill-current text-white" onClick={() => Goback()} />

                    <h3 className="font-bold text-xl">New Question</h3>
                </div>

                <div className=" flex-col p-3 shadow m-3">
                    <div className="flex mb-4">
                        <Profileicon className="w-16 h-auto" />
                        <p className="py-3">Webstar</p>
                    </div>

                    <input name="question" placeholder="Question" className=" w-11/12 border-b border-black  outline-none pl-2 p-2 mb-6 break-words"></input>
                    <input name="description" placeholder="Description" className=" w-11/12 border-b border-black  outline-none pl-2  p-2 mb-6 break-words"></input>
                    {/* <input name="tags" placeholder="Relevant tags" className=" w-11/12 border-b border-black  outline-none pl-2 p-2 mb-6 break-words"></input> */}

                    <div className="flex justify-between w-11/12 border-b border-black pl-2 p-2 " onClick={() => showTags()}>
                        <div id="tags" className="flex flex-wrap">
                        {Tag_placehoder ? <p className="text-gray-500">Relevant tags</p> : null}                        
                        </div>

                        <AnimatedDownicon className="w-4" style={downpropsicon}/>
                    </div>

                    {tags ?
                        <div className="w-11/12 shadow bg-gray-200">
                            <div className="flex border-b justify-between p-2">
                                <input type="text" placeholder="Add tags" className="bg-transparent w-full p-2 pl-2 outline-none border-b border-black" onChange={(e) => handleChange(e.currentTarget.value)} />
                                <button className="btn rounded-full bg-gray-900 px-3 py-2 text-white outline-none" onClick={() => addtags(taginput)}>Add</button>
                            </div>
                            <div className="flex flex-wrap mt-4">

                                <span className="bg-gray-600 text-white px-3 py-1 self-center py-1 rounded-full mx-2 mb-2" onClick={(e) => addtags(e.currentTarget)}>html</span>
                                <span className="bg-gray-600 text-white px-3 py-1 self-center py-1 rounded-full mx-2 mb-2" onClick={(e) => addtags(e.currentTarget)}>css</span>
                                <span className="bg-gray-600 text-white px-3 py-1 self-center py-1 rounded-full mx-2 mb-2" onClick={(e) => addtags(e.currentTarget)}>js</span>
                                <span className="bg-gray-600 text-white px-3 py-1 self-center py-1 rounded-full mx-2 mb-2" onClick={(e) => addtags(e.currentTarget)}>react</span>
                                <span className="bg-gray-600 text-white px-3 py-1 self-center py-1 rounded-full mx-2 mb-2" onClick={(e) => addtags(e.currentTarget)}>nodejs</span>
                                <span className="bg-gray-600 text-white px-3 py-1 self-center py-1 rounded-full mx-2 mb-2" onClick={(e) => addtags(e.currentTarget)}>angular</span>
                                <span className="bg-gray-600 text-white px-3 py-1 self-center py-1 rounded-full mx-2 mb-2" onClick={(e) => addtags(e.currentTarget)}>vue</span>
                                <span className="bg-gray-600 text-white px-3 py-1 self-center py-1 rounded-full mx-2 mb-2" onClick={(e) => addtags(e.currentTarget)}>mongoDB</span>
                                <span className="bg-gray-600 text-white px-3 py-1 self-center py-1 rounded-full mx-2 mb-2" onClick={(e) => addtags(e.currentTarget)}>express</span>
                                <span className="bg-gray-600 text-white px-3 py-1 self-center py-1 rounded-full mx-2 mb-2" onClick={(e) => addtags(e.currentTarget)}>c++</span>


                            </div>


                        </div>


                        : null}


                    <div className="text-right mr-3 p-3 mb-3">
                        <button className="btn p-2" onClick={() => Gohome()}>POST</button>
                    </div>
                </div>


            </div>

            {/* <BottomNav /> */}
        </>
    )
}

export default CreateQuestion;