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



const GETUSERS = gql`
    {
        users {
            displayname,
        }
    }

`;

const Get_USERPROFILE = gql`
    query GET_USERPROFILE ($Userid: String){
        user (Userid: $Userid) {
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
  const [showPreviewImg, setPreviewImg] = useState(false);
  const [displaynameExists, setdisplaynameExists] = useState(false);
  // Check Unique displayname

  const { data: AllUsers } = useQuery(GETUSERS);
  console.log(AllUsers);


  // storing Userid got from loggedIn user in localstorage
  const loggedIn = useSelector(state => state.islogged);
  const Userid = loggedIn.data._id;
  let localUserid = localStorage.setItem("Userid", Userid);

  // Check if UserProfile already exists
  const { loading, data, error } = useQuery(Get_USERPROFILE, { variables: { Userid: localUserid } });
  console.log(data);

  const Check_User_Exists = () => {
    if (data && data.user && localUserid === data.user.Userid) {
      setProfile_exists(true)
    }
  }
  useEffect(() => {
    dispatch(isAuthenticated());
  }, [])

  // useEffect(() => {
  //   Check_User_Exists();
  // },[])

  // Showing Preview of File/image selected
  const readUrl = (e) => {
    setPreviewImg(true);
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
  const [createuser] = useMutation(CREATE_USERPROFILE);

  const CheckDisplayname = (displayname) => {
    let x = false;
    AllUsers.users.map(user => {
      console.log(user.displayname);
      if (user.displayname === displayname) {
        x = false;
        setdisplaynameExists(true);

        return;
      } else {
        setdisplaynameExists(false);

        x = true;
      }
    })
    return x;
  }


  const onSubmit = (data) => {
    console.log(data);

    const unique_displayname = CheckDisplayname(data.displayname);
    
    const form = document.getElementById('form');
    const filedata = new FormData(form);
    const file = filedata.get('file');
    console.log(file);
    if (unique_displayname) {
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
    }
  };

  return (

    <div className="flex flex-col h-full">
      {Profile_exists ? <Redirect to="/search"></Redirect> : null}
      {/* <AppBar /> */}
      <div className="container">
        <div className="text-2xl font-medium p-4" >Create Profile</div>

        <form id="form" onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" className="flex-col px-4 mb-6">
          <div className="text-center mb-3">
            <div className="w-24 h-24 mx-auto">
              {showPreviewImg ? <img src="" alt="preview" id="ProfileImgPreview" className="w-full h-full mx-auto object-cover rounded-full" />

                : <AddProfileicon className="w-full h-full mx-auto object-cover rounded-full" />
              }
            </div>
            <label htmlFor="file" className="text-blue-600 font-medium">Choose Profile Photo</label>
            <input id="file" type="file" name="file" className="hidden" ref={register} onChange={(e) => readUrl(e.currentTarget)} />
          </div>

          <div className="w-full outline-none my-3">
            <label htmlFor="displayname" className="font-medium mb-1">Displayname</label>
            <input type="text" name="displayname" ref={register}
              className={`w-full outline-none border border-gray-300 p-2 rounded-lg ${displaynameExists ? "text-red-600" : ""}`}
               placeholder={`${displaynameExists ? 'Already exists, use another displayname' : ''}`} onChange={(e) => CheckDisplayname(e.currentTarget.value)}></input>
          </div>

          <div className="w-full outline-none my-3">
            <label htmlFor="name" className="font-medium mb-1">Name</label>
            <input type="text" name="name" ref={register} className="w-full outline-none border border-gray-300 p-2 rounded-lg "></input>
          </div>

          <div className="w-full outline-none my-3">
            <label htmlFor="about" className="font-medium mb-1">Bio</label>
            <textarea rows="3" type="text" name="about" ref={register} className="w-full outline-none border border-gray-300 p-2 rounded-lg "></textarea>
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
            <input type="text" name="education" ref={register} className="w-full outline-none border border-gray-300 p-2 rounded-lg "></input>
          </div>
          <div className="flex">
            {/* <button className="px-4 py-2 rounded-lg bg-blue-500 text-white mt-3 ml-auto" type="submit"><Link to={`/`}>Done</Link></button>             */}
            <button className="px-4 py-2 rounded-lg bg-blue-500 text-white mt-3 ml-auto" type="submit">Done</button>

          </div>
        </form>
      </div>
    </div>

  )
}

export default CreateProfile;