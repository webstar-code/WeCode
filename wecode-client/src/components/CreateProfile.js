import React, { useEffect, useState } from 'react';
import '../index.css'
import AppBar from './AppBar';
import { ReactComponent as AddProfileicon } from './icons/utilitiesicon/account_circle.svg';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import { useDispatch, useSelector } from 'react-redux';
import isAuthenticated from '../redux/actions/isAuthenticated';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Get_USERPROFILE = gql`
    query GET_USERPROFILE ($displayname: String){
        user (displayname: $displayname) {
            Userid,
             name,
             displayname,
             about,
             profession,
             education
        }
    }
`;

const CREATE_USERPROFILE = gql`
    mutation CREATE_USERPROFILE($Userid: String!, $displayname: String!, $name: String!, 
        $about: String, $profession: String, $education: String , $ProfileImgref: String) {
            user(Userid: $Userid, displayname: $displayname, name: $name,
                about: $about, profession: $profession, education: $education, ProfileImgref: $ProfileImgref) {
        Userid
        displayname,
        name,
        about,
        profession,
        education,
        ProfileImgref
            }
    }


`;

const CreateProfile = (props) => {
    const User = props.User;
    const dispatch = useDispatch();
    const [Profile_exists, setProfile_exists] = useState(false);
    const loggedIn = useSelector(state => state.islogged);
    const displayname = loggedIn.data.name;
    const { loading, data, error } = useQuery(Get_USERPROFILE, { variables: { displayname } });
    console.log(loggedIn.data._id);

    // storing Userid got from loggedIn user in localstorage
    const Userid = loggedIn.data._id;
    let localUserid = localStorage.setItem("Userid", Userid);

    const Check_User_Exists = () => {
        if (data && data.user && localUserid === data.user.Userid) {
            setProfile_exists(true)
        }

    }
    useEffect(() => {
        dispatch(isAuthenticated());

    }, [])

    useEffect(() => {
        Check_User_Exists();
    })


    const { handleSubmit, register } = useForm();
    // Createing the UserProfile
    const [createuser] = useMutation(CREATE_USERPROFILE);
    const onSubmit = async (data) => {
        console.log(data);

        const form = document.getElementById('form');
        const filedata = new FormData(form);
        const file = filedata.get('file');
        console.log(file);
        if (file && file.name) {
            console.log(file);

            fetch('/api/upload', {
                method: 'POST',                
                body: filedata
            })
                .then((res) => res.json())
                .then((filedata) => {
                    createuser(
                        {
                            variables: {
                                Userid: loggedIn.data._id,
                                displayname: data.displayname,
                                name: data.name,
                                about: data.about,
                                profession: data.profession,
                                education: data.education,
                                ProfileImgref: `${filedata ? filedata.id : ''}`
                            },
                        })
                })
                .catch(err => {
                    console.log(err);
                });
        } else {
            createuser(
                {
                    variables: {
                        Userid: loggedIn.data._id,
                        displayname: data.displayname,
                        name: data.name,
                        about: data.about,
                        profession: data.profession,
                        education: data.education,
                    },
                })
        }

    };

    return (

        <div className="flex flex-col bg-gray-900 h-full">
            {Profile_exists ? <Redirect to="/search"></Redirect> : null}
            <AppBar />
            <div className="container">
                <div className="text-2xl p-3  text-gray-500" >Create Profile</div>
                <AddProfileicon className="w-2/5 h-auto fill-current text-gray-500 mx-auto">
                </AddProfileicon>

                <form id="form" onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" className="w-4/5 flex flex-col mx-auto p-3">

                    <label htmlFor="file" className="block font-bold my-2 text-gray-500">ProfileImage</label>
                    <input type="file" name="file" ref={register} className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"></input>

                    <label htmlFor="displayname" className="block font-bold my-2 text-gray-500">Displayname</label>
                    <input type="text" name="displayname" ref={register} className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline" placeholder={`${User ? User : null}`}></input>
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
                    <label htmlFor="education" className="block  font-bold my-2 text-gray-500">Education</label>
                    <input type="text" name="education" ref={register} className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"></input>

                    <button className="btn bg-green-500 px-6 py-3 hover:bg-green-701 rounded my-6 text-black-500 "><Link to="/search">Done</Link></button>

                </form>
            </div>
        </div>

    )
}

export default CreateProfile;