import React, { useState } from 'react';
import { ReactComponent as AddProfileicon } from './icons/utilitiesicon/account_circle.svg';
import BackIcon from './utilties/CustomIcons'
import { motion } from 'framer-motion';
const EditProfile = (props) => {
    const [user, setuser] = useState({
        name: 'Bhavesh choudhary',
        displayname: 'webstar',
        about: 'I am web developer',
        profession: '',
        university: '',
        Experience: '',
    });

    const handleChange = (e) => {
        setuser({
            ...user,
            [e.name]: e.value
        });
    }

    const containervariants = {
        hidden: {
            opacity: '0',
            x: '100vw'
        },
        visible: {
            opacity: '1',
            x: '0',
            // transition={{stiffness:10}}
            // transition: {
            //     stiffness: 10
            // }
        },
        exit: {
            x: '100vw',
            transition: {
                ease: 'easeInOut'
            }
        }
    }


    return (
        <motion.div className=""
            variants={containervariants}
            initial="hidden"
            animate="visible"
            exit="exit"
        >
            <div className="flex shadow py-2 bg-blue-gray text-white text-">
                {/* <Backicon className="w-16 h-auto px-4  stroke-current fill-current text-white" onClick={() => Goback()} /> */}
                <BackIcon />
                <h3 className="font-medium text-xl self-center">Edit Profile</h3>
            </div>
            <div className="text-center my-3"

            >
                <AddProfileicon className="w-24 h-auto mx-auto" />
                <div className="text-blue-600 font-medium">Change Profile Photo</div>
            </div>

            <form className="px-4 mb-6">
                <div className="w-full outline-none my-3">
                    <label htmlFor="name" className=" font-medium mb-1">Name</label>
                    <input type="text" name="name" className="w-full outline-none border border-gray-300 px-2 p-2 rounded-lg"
                        onChange={(e) => handleChange(e.currentTarget)} value={`${user.name}`} />
                </div>
                <div className="w-full outline-none my-3">
                    <label htmlFor="displayname" className=" font-medium mb-1">Displayname</label>
                    <input type="text" name="displayname" className="w-full outline-none border border-gray-300 p-2 rounded-lg"
                        onChange={(e) => handleChange(e.currentTarget)} value={`${user.displayname}`} />
                </div>

                <div className="w-full outline-none my-3">
                    <label htmlFor="about" className=" font-medium mb-1">Bio</label>
                    <textarea rows="3" name="about" className="w-full outline-none border border-gray-300 p-2 rounded-lg"
                        onChange={(e) => handleChange(e.currentTarget)} value={`${user.about}`} />
                </div>
                <div className="w-full outline-none my-3">
                    <label htmlFor="profession" className=" font-medium mb-1">Profession</label>
                    <input type="text" name="profession" className="w-full outline-none border border-gray-300 p-2 rounded-lg"
                        onChange={(e) => handleChange(e.currentTarget)} value={`${user.profession}`} />
                </div>
                <div className="w-full outline-none my-3">
                    <label htmlFor="university" className=" font-medium mb-1">University</label>
                    <input type="text" name="university" className="w-full outline-none border border-gray-300 p-2 rounded-lg"
                        onChange={(e) => handleChange(e.currentTarget)} value={`${user.university}`} />
                </div>

                <motion.button whileHover={{ scale: '1.05' }} className="px-4 py-2 rounded-lg bg-blue-500 text-white absolute right-0 mr-6 mt-3">Submit</motion.button>
            </form>
        </motion.div>
    )
}

export default EditProfile;