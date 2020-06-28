import React from 'react';
import { ReactComponent as Profileicon } from './icons/utilitiesicon/account_circle.svg'



const Reply = (props) => {
    const reply = props.reply;
    return (

        <>
            <div className="min-w-half mb-8 ml-4 border-l pl-2">
                <div className="flex text-sm font-bold py-2  text-xs">
                    <Profileicon className="w-6 h-auto mr-2" />
                    <span className="">{reply.name}</span>
                    <span className="text-gray-500 px-2">{reply.createAt}</span>

                </div>
                <div className="text-sm">
                    {reply.comment}
                    {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta saepe repudiandae
            amet velit? Odio iusto autem laborum sequi asperiores enim pariatur temporibus
            laboriosam! Saepe, ullam omnis? Incidunt rerum id itaque. */}
                </div>
                <div className="flex justify-end text-sm text-gray-500 py-2">
                        <div className="px-2">Likes {reply.likes}</div>
                        <div className="px-2">reply</div>
                </div>
                {reply.reply ? reply.reply.map(reply => <Reply reply={reply} />) : null}

            </div>
        </>
    )
}

export default Reply;