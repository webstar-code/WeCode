import React, { useState } from 'react';
import '../index.css'
import { ReactComponent as Codeicon} from './icons/brandcicons/code-24px.svg'
import { ReactComponent as Googleicon} from './icons/brandcicons/google.svg'
import { ReactComponent as Facebookicon} from './icons/brandcicons/facebook.svg'
import { Redirect } from 'react-router-dom';

const SignIn = () => {

    return (
        <>
        <div className="flex flex-col bg-gray-900 h-screen">
        <Codeicon className="w-4/5 h-auto mx-auto fill-current text-gray-500"/>
        <div className="font-sans text-6xl mx-auto font-bold -mt-12 text-blue-gray">WeCode</div>

        <div className="my-6"> 
            <button className="btn flex items-center btn px-6 py-3 w-4/5 md:w-2/5 bg-white border rounded my-3 mx-auto">
                <Googleicon className="h-auto pr-3"/>
                <p className="w-4/5 text-left pl-3"><a href="/auth/google">Sign in with Google</a></p></button>
            <button className="btn flex items-center px-6 py-3 w-4/5 md:w-2/5 bg-white border rounded my-3 mx-auto">
                <Facebookicon  className="h-auto pr-3"/>
                <p className="w-4/5 text-left pl-3"><a href="/auth/facebook">Sign in with Facebook</a></p></button>
        </div>
        
    </div> 
    </>
    
    )}

export default SignIn;