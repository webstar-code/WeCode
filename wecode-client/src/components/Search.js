import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import AppBar from './AppBar';
import BottomNav from './BottomNav'
import { ReactComponent as Searchicon} from './icons/Navicons/search.svg'
import { ReactComponent as Profileicon} from './icons/utilitiesicon/account_circle.svg'
import { useDispatch, useSelector } from 'react-redux'
import getUsers from '../redux/actions/getUsers'
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

const GETUSERS = gql`
    {
        users {
            displayname,
        }
    }

`;

const Search = () => {
    const { loading, data, error } = useQuery(GETUSERS);
    return(

        <>
        
        <div className="container px-3">
            <div className="flex rounded border border-black p-2 my-2">
            <Searchicon className="w-6 h-auto"/>
            <input type="text" name="search" placeholder="Search" className=" w-4/5 border-b-2 outline-none pl-2 text-md"></input>
            </div>

            <div className="">
            {data ? data.users.map((user) => {return (
                  <div className="flex items-center my-3">
                  <Profileicon className="w-16 h-auto"/>
            <h3 className="font-bold px-3"><Link to={`/profile/${user.displayname}`}>{user.displayname}</Link></h3>
                  <button className="btn rounded justify-end px-3 bg-blue-500 ml-auto">Follow</button>
              </div>
            )}) : loading ? <div>Loading</div> 
                : error ?  <div className="text-red-900 text-2xl text-center"> Something went wrong</div>
                : null
        }



            </div>
        </div>
        </>
    )
}

export default Search;