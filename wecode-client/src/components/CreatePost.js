import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { ReactComponent as Profileicon } from './icons/utilitiesicon/account_circle.svg';
import { ReactComponent as Backicon } from './icons/utilitiesicon/back.svg';
import { ReactComponent as AddImageicon } from './icons/utilitiesicon/photo.svg';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import moment from 'moment';

import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';

const Get_USERPROFILE = gql`
    query GET_USERPROFILE ($Userid: String){
        user (Userid: $Userid) {
            Userid,
             displayname,
             ProfileImgref
        }
    }
`;
const CREATE_POST = gql`
    mutation CREATE_POST($Userid: String, $bgcolor: String, $caption: String,  
      $PostImgref: String, $ProfileImgref: String, $displayname: String, $createdAt: String) {

        post(Userid: $Userid,  bgcolor: $bgcolor, caption: $caption
           PostImgref: $PostImgref, ProfileImgref: $ProfileImgref, displayname: $displayname, createdAt: $createdAt) {
            Userid,
            caption
        }
    }

`;

const CreatePost = () => {
  const [template, settemplate] = useState(false);
  const [bgcolor, setbgcolor] = useState('bg-white');
  const [textlength, settextlength] = useState(0);
  const [caption, setcaption] = useState('');
  const [showPreviewImg, setPreviewImg] = useState(false);
  const history = useHistory();
  const localUserid = localStorage.getItem('Userid');

  const { data: Userdata } = useQuery(Get_USERPROFILE, { variables: { Userid: localUserid } });
    
  const [createpost] = useMutation(CREATE_POST);
  const Goback = () => {
    history.goBack();
  }

  const changebg = (color) => {
    settemplate(true);
    setbgcolor(color);

    if (color === 'bg-white') {
      settemplate(false);
    }
  }
  const handleTextlength = (e) => {
    settextlength(e.currentTarget.value.length);
    setcaption(e.currentTarget.value);
  }
  const { handleSubmit, register } = useForm();

  const readUrl = (e) => {
    setPreviewImg(true);
    if (e.files && e.files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
        document.getElementById('postImg').setAttribute("src", e.target.result);
      }
      reader.readAsDataURL(e.files[0]);
    }
  }

  const onSubmit = (data) => {
    console.log(data);
    const form = document.getElementById('form');
    const filedata = new FormData(form);
    const file = filedata.get('file');
    let timenow = moment().format();
    console.log(timenow);
    console.log(file);;
    if (file && file.name) {
      fetch('/api/upload', {
        method: "POST",
        body: filedata
      })
        .then((res) => res.json())
        .then((filedata) => {
          createpost(
            {
              variables: {
                Userid: localUserid,
                displayname: Userdata.user.displayname,
                ProfileImgref: Userdata.user.ProfileImgref,
                PostImgref: `${filedata ? filedata.id : '1'}`,
                caption: caption,
                createdAt: moment().format()
              },
            })
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      createpost(
        {
          variables: {
            Userid: localUserid,
            displayname: Userdata.user.displayname,
            ProfileImgref: Userdata.user.ProfileImgref,
            bgcolor: bgcolor,
            caption: data.caption,
            createdAt: timenow
          },
        })
    }
    history.push(`/profile/${Userdata.user.displayname}`)
  }

  return (
    <>
      <div className="">
        <div className="flex shadow px-2 py-3 bg-blue-gray text-white">
          <Backicon className="w-16 h-auto px-4  stroke-current fill-current text-white" onClick={() => Goback()} />

          <h3 className="font-bold text-xl">New Post</h3>
        </div>
        <form id="form" onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          {Userdata && Userdata.user ?
            <div className="flex items-center pt-4">
              <div className="w-8 h-8 mx-2">
                <img src={`/api/image/${Userdata.user.ProfileImgref}`} alt="UserProfile Image" id="ProfileImgPreview"
                  className="w-full h-full mx-auto object-cover rounded-full" />
              </div>
          <p className="pl-2">{Userdata.user.displayname}</p>
            </div>
            : null}

          {showPreviewImg ? <img src="" alt="preview" id="postImg" className="" /> : null}
          <div id="bgstyle" className={` flex-col ${bgcolor} px-2 text-2xl `}>
            <div className="mx-2 text-sm text-gray-500 text-right">{textlength}/512</div>

            <textarea name="caption" ref={register} required maxLength="512" rows="10" className={`w-full overflow-y-hidden border-none outline-none text-xl bg-transparent 
                        ${template ? "text-center self-center font-bold" : null}    
                        ${(bgcolor == "bg-blue-gray" || bgcolor === "bg-gradient-dblue" || bgcolor === "bg-gradient-pinkblue") ? "text-white" : null}
                        `} placeholder="Share coding tips, articles, snippets and anything code related" onChange={(e) => handleTextlength(e)}  ></textarea>

          </div>

          <div className="flex-col bottom-0 absolute w-screen p-3">
            <div className="flex justify-around border-b border-black py-2">
              <span id="colors" className="w-6 h-6 rounded bg-white border" onClick={() => changebg('bg-white')}></span>
              <span className="w-6 h-6 rounded bg-blue-gray border" onClick={() => changebg('bg-blue-gray')}></span>
              <span className="w-6 h-6 rounded bg-red-500 border" onClick={() => changebg('bg-red-500')}></span>
              <span className="w-6 h-6 rounded bg-teal-500 border" onClick={() => changebg('bg-teal-500')}></span>
              <span className="w-6 h-6 rounded bg-gradient-pinkblue border" onClick={() => changebg('bg-gradient-pinkblue')}></span>
              <span className="w-6 h-6 rounded bg-gradient-gray border" onClick={() => changebg('bg-gradient-gray')}></span>
              <span className="w-6 h-6 rounded bg-lighblue border" onClick={() => changebg('bg-gradient-lightblue')}></span>
              <span className="w-6 h-6 rounded bg-gradient-dblue border" onClick={() => changebg('bg-gradient-dblue')}></span>
              <span className="w-6 h-6 rounded bg-gradient-orange border" onClick={() => changebg('bg-gradient-orange')}></span>
              <span className="w-6 h-6 rounded bg-gradient-bluered foo border" onClick={() => changebg('bg-gradient-bluered')}></span>


            </div>

            <div className="flex justify-between">
              <div className="flex align-middle">
                <span className="text-gray-500 mr-3 self-center">insert</span>
                <label htmlFor="file" className="self-center"><AddImageicon className="w-6 h-auto cursor-pointer" /></label>
                <input id="file" type="file" name="file" className="hidden" ref={register} onChange={(e) => readUrl(e.currentTarget)} />
              </div>
              <button className="btn px-2 py-3 mr-3" type="submit">POST</button>
            </div>
          </div>
        </form>
      </div>


    </>
  )
}

export default CreatePost;