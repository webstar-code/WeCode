import React from 'react';
import { Link } from 'react-router-dom';
import Question from './Question';
// import { ReactComponent as Backicon } from './icons/utilitiesicon/back.svg'
import { ReactComponent as Profileicon } from './icons/utilitiesicon/account_circle.svg'
import BackIcon from './utilties/CustomIcons'
import Comments from './Comment';

const Discussion = ({match}) => {
    const questionid = match.params.questionid;
    console.log(questionid);
    return (


        <div className="">
            <div className="flex shadow py-3 bg-blue-gray text-white text-">
                {/* <Backicon className="w-16 h-auto px-4  stroke-current fill-current text-white" onClick={() => Goback()} /> */}
                <BackIcon />
                <h3 className="font-bold text-xl self-center">Discussions</h3>
            </div>


            <Question Render={'long'}/>

            <div className="px-4 py-2 bg-gray-300 text-gray-700">Comments</div>
            <div className="Comments">
                <Comments />
            </div>

            <div className="flex w-screen bottom-0 fixed bg-white justify-between  py-2 shadow-t">
                <Profileicon className="w-12 h-auto p-2" />
                <Link to="/createcomment" className="w-11/12 p-2 text-gray-700 bg-gray-500 rounded- mr-3 rounded-full self-center">
                    Add a comment
                </Link>
            </div>



        </div>

    )


}

export default Discussion;