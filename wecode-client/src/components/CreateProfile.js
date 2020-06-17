import React, { useEffect } from 'react';
import '../index.css'
import AppBar from './AppBar';
import { ReactComponent as AddProfileicon } from './icons/account_circle.svg';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';


const CREATE_USERPROFILE = gql`

    mutation CREATE_USERPROFILE($Userid: Int!, $displayname: String!, $name: String!, 
        $about: String, $profession: String, $university: String, $ProfileImage: Upload) {
            user(Userid: $Userid, displayname: $displayname, name: $name,
                about: $about, profession: $profession, university: $university, ProfileImg: $ProfileImg) {
        Userid
        displayname,
        name,
        about,
        profession,
        university,
        ProfileImg
            }

    }


`;


const CreateProfile = () => {
    const { handleSubmit, register } = useForm();
    const [createuser, { data }] = useMutation(CREATE_USERPROFILE);

    const onSubmit = (data) => {
        createuser(
            {
                variables: {
                    Userid: 123,
                    displayname: data.displayname,
                    name: data.name,
                    about: data.about,
                    profession: data.profession,
                    education: data.education,
                    ProfileImg: data.file
                },


            })
    };

    return (

        <div className="flex flex-col bg-gray-900 h-full">
            <AppBar />
            <div className="container">
                <div className="text-2xl p-3  text-gray-500" >Create Profile</div>
                <AddProfileicon className="w-2/5 h-auto fill-current text-gray-500 mx-auto">
                </AddProfileicon>


                <form id="form" onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" className="w-4/5 flex flex-col mx-auto p-3">
                    <label htmlFor="file" className="block font-bold my-2 text-gray-500">ProfileImage</label>
                    <input type="file" name="file" ref={register} className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"></input>

                    <label htmlFor="displayname" className="block font-bold my-2 text-gray-500">Displayname</label>
                    <input type="text" name="displayname" ref={register} className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"></input>
                    <label htmlFor="name" className="block  font-bold my-2 text-gray-500">Name</label>
                    <input type="text" name="name" ref={register} className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"></input>
                    <label htmlFor="about" className="block  font-bold my-2 text-gray-500">About</label>
                    <input type="text" name="about" ref={register} className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"></input>
                    <label htmlFor="profession" className="block  font-bold my-2 text-gray-500">Profession</label>
                    <select name="profession" ref={register} className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                        <option value="student">student</option>
                        <option value="teacher">teacher</option>
                        <option value="employee">employee</option>
                    </select>
                    <label htmlFor="university" className="block  font-bold my-2 text-gray-500">University</label>
                    <input type="text" name="university" ref={register} className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"></input>

                    <button className="btn bg-green-500 px-6 py-3 hover:bg-green-701 rounded my-6 text-black-500 ">Done</button>
                </form>
            </div>
        </div>

    )
}

export default CreateProfile;