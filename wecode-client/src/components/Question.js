import React from 'react';
import { ReactComponent as Profileicon } from './icons/account_circle.svg'


const Question = () => {
return (
    <div className="w-full flex-col shadow border-black-900 ">
        <div className="flex text-sm font-bold py-2 my-4">
            <Profileicon className="w-12" />
                            webstar
                        </div>
        <div className="text-2xl py-4 px-2 border-b-2">
            <p>What is the C language</p>
        </div>
        <div className="flex justify-around py-2">
            <div className="">stars</div>
            <div className="like">discuss</div>
        </div>
        <div className="text-gray-500 text-sm px-2">2 July 2020</div>

    </div>
)
}

export default Question