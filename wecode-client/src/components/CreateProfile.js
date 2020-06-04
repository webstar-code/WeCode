import React from 'react';
import '../index.css'
import AppBar from './AppBar';

const CreateProfile = () => {
    return (
        <div className="flex flex-col bg-gray-900 h-screen">
            <AppBar />
            <div className="container">
                <div className="text-2xl text-gray-500 p-6">Create Profile</div>
            </div>
        </div>

    )
}

export default CreateProfile;