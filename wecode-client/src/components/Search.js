import React from 'react'
import AppBar from './AppBar';
import BottomNav from './BottomNav'
import { ReactComponent as Searchicon} from './icons/search.svg'
import { ReactComponent as Profileicon} from './icons/account_circle.svg'

const Search = () => {
    return(
        <>
        <AppBar />
        <div className="container px-3">
            <div className="flex rounded border border-black p-2 my-2">
            <Searchicon className="w-6 h-auto"/>
            <input type="text" name="search" placeholder="Search" className=" w-4/5 border-b-2 outline-none pl-2 text-md"></input>
            </div>

            <div className="">
                <div className="flex items-center my-3">
                    <Profileicon className="w-16 h-auto"/>
                    <h3 className="font-bold px-3">Bhavesh choudhary</h3>
                    <button className="btn rounded justify-end px-3 bg-blue-500 ml-auto">Follow</button>
                </div>
                <div className="flex items-center my-3">
                    <Profileicon className="w-16 h-auto"/>
                    <h3 className="font-bold px-3">Jacob Jacc</h3>
                    <button className="btn rounded justify-end px-3 bg-blue-500 ml-auto">Follow</button>
                </div>
                <div className="flex items-center my-3">
                    <Profileicon className="w-16 h-auto"/>
                    <h3 className="font-bold px-3">joe Rogan</h3>
                    <button className="btn rounded justify-end px-3 bg-blue-500 ml-auto">Follow</button>
                </div>
                <div className="flex items-center my-3">
                    <Profileicon className="w-16 h-auto"/>
                    <h3 className="font-bold px-3">webstar.codes</h3>
                    <button className="btn rounded justify-end px-3 bg-blue-500 ml-auto">Follow</button>
                </div>

            </div>
        </div>
        <BottomNav />
        </>
    )
}

export default Search;