import React, { useState } from 'react';
import { ReactComponent as AddProfileicon } from './icons/utilitiesicon/account_circle.svg';
import BackIcon from './utilties/CustomIcons'
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { Link, Redirect } from 'react-router-dom';

// For getting existing UserProfile Data
const Get_USERPROFILE = gql`
    query GET_USERPROFILE ($Userid: String){
        user (Userid: $Userid) {
            Userid,
             name,
             displayname,
             about,
             profession,
             education,
             ProfileImgref
        }
    }
`;
// Send Userprofile data 
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

const EditProfile = (props) => {
    let localUserid = localStorage.getItem('Userid');
    const [newdisplayname, setnewdisplayname] = useState('');
    const { data } = useQuery(Get_USERPROFILE, { variables: { Userid: localUserid } });
    console.log(data);
    // Showing Preview of File/image selected
    const readUrl = (e) => {
        if (e.files && e.files[0]) {
            let reader = new FileReader();
            reader.onload = (e) => {
                document.getElementById('ProfileImgPreview').setAttribute("src", e.target.result);
            }
            reader.readAsDataURL(e.files[0]);
        }
    }

    const { handleSubmit, register } = useForm();
    // Createing the UserProfile
    const [createuser, {loading}] = useMutation(CREATE_USERPROFILE);
    console.log(newdisplayname);
    console.log(loading);
    const onSubmit = async (data) => {
        console.log(data);
        setnewdisplayname(data.displayname);
        console.log(newdisplayname);
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
                                Userid: localUserid,
                                displayname: data.displayname,
                                name: data.name,
                                about: data.about,
                                profession: data.profession,
                                education: data.education,
                                ProfileImgref: `${filedata ? filedata.id : data.user.ProfileImgref}`
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
                        Userid: localUserid,
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
        <div className="container">
            <div className="flex shadow py-2 bg-blue-gray text-white text-">
                {/* <Backicon className="w-16 h-auto px-4  stroke-current fill-current text-white" onClick={() => Goback()} /> */}
                <BackIcon />
                <h3 className="font-medium text-xl self-center">Edit Profile</h3>
            </div>
            {newdisplayname && loading ? <Redirect to={`/profile/${newdisplayname}`} /> : null}

            {data && data.user ?

                <form id="form" onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" className="flex-col px-4 mb-6">
                    <div className="text-center mb-3">
                        <div className="w-24 h-24 mx-auto">
                            <img src={`/api/image/${data.user.ProfileImgref}`} alt="UserProfile Image" id="ProfileImgPreview"
                                className="w-full h-full mx-auto object-cover rounded-full" />
                        </div>
                        <label htmlFor="file" className="text-blue-600 font-medium">Change Profile Photo</label>
                        <input id="file" type="file" name="file" className="hidden" ref={register} onChange={(e) => readUrl(e.currentTarget)} />
                    </div>

                    <div className="w-full outline-none my-3">
                        <label htmlFor="displayname" className="font-medium mb-1">Displayname</label>
                        <input type="text" name="displayname" ref={register}
                            className="w-full outline-none border border-gray-300 p-2 rounded-lg "
                            defaultValue={`${data.user.displayname}`}></input>
                    </div>

                    <div className="w-full outline-none my-3">
                        <label htmlFor="name" className="font-medium mb-1">Name</label>
                        <input type="text" name="name" ref={register}
                            className="w-full outline-none border border-gray-300 p-2 rounded-lg "
                            defaultValue={`${data.user.name}`}></input>
                    </div>

                    <div className="w-full outline-none my-3">
                        <label htmlFor="about" className="font-medium mb-1">Bio</label>
                        <textarea rows="3" type="text" name="about" ref={register}
                            className="w-full outline-none border border-gray-300 p-2 rounded-lg "
                            defaultValue={`${data.user.displayname}`}></textarea>
                    </div>

                    <div className="w-full outline-none my-3">
                        <label htmlFor="profession" className="font-medium mb-1">Profession</label>
                        <select name="profession" ref={register} className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 p-2 pr-8 rounded-lg  leading-tight focus:outline-none focus:-outline">
                            <option value="student">student</option>
                            <option value="teacher">teacher</option>
                            <option value="employee">employee</option>
                        </select>
                    </div>

                    <div className="w-full outline-none my-3">

                        <label htmlFor="education" className="font-medium mb-1">Education</label>
                        <input type="text" name="education" ref={register}
                            className="w-full outline-none border border-gray-300 p-2 rounded-lg "
                            defaultValue={`${data.user.displayname}`}></input>
                    </div>
                    <div className="flex">
                        {/* <button className="px-4 py-2 rounded-lg bg-blue-500 text-white mt-3 ml-auto" type="submit">Done</button> */}

                        <button className="px-4 py-2 rounded-lg bg-blue-500 text-white mt-3 ml-auto" type="submit">
                            Done
                        </button>
                    </div>
                </form>
                : <p>updating...</p>}

        </div>

    )
}

export default EditProfile;