import React from 'react';
import '../index.css'
import { ReactComponent as Codeicon} from './icons/code-24px.svg'
import { ReactComponent as Googleicon} from './icons/google.svg'
import { ReactComponent as Facebookicon} from './icons/facebook.svg'
import { Link } from 'react-router-dom';

const Home = () => {

    return (
        <div className="flex flex-col bg-gray-900 h-screen">
            <Codeicon className="w-4/5 h-auto mx-auto fill-current text-gray-500"/>
            <div className="font-sans text-6xl mx-auto font-bold -mt-12 text-blue-gray">WeCode</div>

            <div className="my-6"> 
                <button className="btn flex items-center btn px-6 py-3 w-4/5 md:w-2/5 bg-white border rounded my-3 mx-auto">
                    <Googleicon className="h-auto pr-3"/>
                    <p className="w-4/5 text-left pl-3"><a href="http://localhost:3000/auth/google"><Link to="/createprofile">Sign in with Google</Link></a></p></button>
                <button className="btn flex items-center px-6 py-3 w-4/5 md:w-2/5 bg-white border rounded my-3 mx-auto">
                    <Facebookicon  className="h-auto pr-3"/>
                    <p className="w-4/5 text-left pl-3"><a href="http://localhost:3s000/auth/facebook"> "><Link to="/createprofile">Sign in with Facebook</Link></a></p></button>
            </div>
        </div>

    )
}

export default Home;