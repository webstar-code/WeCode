import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Profileicon } from './icons/utilitiesicon/account_circle.svg'
import { useState } from 'react';

/*  
    {   
        QID : unique id,
        User : {
                profileImg,
                name
                },
        question: String,
        description: String,
        tags: [  html , css , js ]
        createAt: String,
        stars: Number,
    }


*/
const questions = [{
    name: "webstar",
    question: "Hey is C still relevant in 2020 ? ",
    description: `Many universtires are teaching C language as first year and dont find it very uesfukk loewn espsn
        ahsdhasdbhasdbhabdshbahsdbhasbdhbasd jasdjasnjndb hasbda akjds nsadn  ansdjn asn dkjasnd njasd  ansd
        asjd aknd jas jkdasn njk nasdnf;ads n askjnf b bsdb ab hfba ;sdnf kjasdf jn asljdf sdf ksbf  k`,
    tags: ['html', 'css', 'js', 'c', 'c++', 'programming'],
    createAt: '2 July 2020',
    stars: 2,
}
]

const Question = (props) => {
    const Render = props.Render
    const [Renderin, setrender] = useState(Render)

    return (
        // <div className="w-full flex-col shadow border-black-900 ">
        //     <div className="flex text-sm font-bold py-2 my-4">
        //         <Profileicon className="w-12" />
        //                         webstar
        //                     </div>
        //     <div className="text-2xl py-4 px-2 border-b-2">
        //         <p>What is the C language</p>
        //     </div>
        //     <div className="flex justify-around py-2">
        //         <div className="">stars</div>
        //         <Link to="/discussion"><div className="like">discuss</div></Link>
        //     </div>
        //     <div className="text-gray-500 text-sm px-2">2 July 2020</div>

        // </div>

        <>
            {questions ? questions.map(question => (
                <div className="w-full flex-col shadow border-black-900 my-2">
                    <div className="flex text-sm font-bold py-2">
                        <Profileicon className="w-12" />
                        {question.name}
                    <div className="text-gray-500 text-xsm px-2">{question.createAt}</div>

                    </div>
                    <div className=" px-3">
                        <p className="font-medium text-xl">{question.question}</p>
                        {Renderin === 'long' ?  <p className="text-sm">{question.description}</p>
                      
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
                        <div className="">stars{question.stars}</div>
                        <Link to="/discussion"><div className="like">discuss</div></Link>
                    </div>

                </div>
            )): null}

        </>
    )


}

export default Question