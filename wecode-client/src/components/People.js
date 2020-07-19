import React, { useState } from 'react';
import BackIcon from './utilties/CustomIcons'
import Followers from './Followers'
import Following from './Following'
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const GET_USER = gql`
    query GET_USER($displayname: String){
        user (displayname: $displayname) {
            Userid,
            displayname
            ProfileImgref,
            following {
                Userid,
                displayname,
                ProfileImgref
            },
            followers {
                Userid,
                displayname,
                ProfileImgref
            }
        }
    }

`;

const People = ({ match }) => {
    const displayname = match.params.displayname;
    console.log(displayname);

    const [activetab, setactivetab] = useState(true);
    let localUserid = localStorage.getItem('Userid');
    const { loading, data, error, refetch } = useQuery(GET_USER, {
        variables: { displayname },

    });
    console.log(data);
    return (
        <div className="">
            {data && data.user ?
                <>
                    <div className="flex shadow py-2 bg-blue-gray text-white text-">
                        {/* <Backicon className="w-16 h-auto px-4  stroke-current fill-current text-white" onClick={() => Goback()} /> */}
                        <BackIcon />
                        <h3 className="font-medium text-xl self-center">webstar</h3>
                    </div>

                    <div className="w-full flex justify-around border-t border-b border-black py-3">
            <div className="text-center font-medium text-sm" onClick={() => setactivetab(true)}>followers {data.user.followers.length}</div>
                        <div className="text-center font-medium text-sm" onClick={() => setactivetab(false)}>following  {data.user.following.length}</div>
                    </div>
                    {
                        activetab ? <Followers followers={data.user.followers} user={data} /> : <Following following={[data.user.following]} user={data}  />
                    }
                </>
            : <p>Loading ...</p>}

        </div>
    )
}

export default People;