import React, { useEffect} from 'react'
import { Link } from 'react-router-dom';
// import { ReactComponent as Homeicon} from './icons/home.svg'
import { ReactComponent as Homeicon} from './icons/browser.svg'

import { ReactComponent as Searchicon} from './icons/search.svg'
import { ReactComponent as Addicon} from './icons/icons8-plus.svg'
import { ReactComponent as Messageicon } from './icons/message.svg'
import { ReactComponent as Profileicon} from './icons/account_circle.svg'
import { useDispatch, useSelector } from 'react-redux'
import isAuthenticated from '../redux/actions/isAuthenticated'

import { useSpring, animated } from 'react-spring';
import { useState } from 'react';



const BottomNav = () => {
    const [active ,setactive] = useState(false);
    const [home, sethome] = useState(false);
    const [search, setsearch] = useState(null);
    const [message, setmessage] = useState(false);

    console.log(search);
  

    const dispatch = useDispatch();
    const loggedIn = useSelector(state => state.islogged);
    // console.log(loggedIn);

    // useEffect(() => {
    //     dispatch(isAuthenticated());

    // }, [])

    const toggleActive = () => {
        setactive(!active);
    }
    const plusprops = useSpring({
        transform: active ? "rotate(45deg)" : "rotate(0deg)"
    })

    const postprops = useSpring({
        right: active ? 30 : -20,
        opacity: active ? 1 : 0,
        top: active ? -75 : 0
    })
    const askprops = useSpring({
        left: active ? 30 : -20,
        opacity: active ? 1 : 0,
        top: active ? -75 : 0
    })

    const Animatedplus = animated(Addicon);

    const activeicon = () => {
        setsearch(true)
    }

    return(
        
        <div className="flex align-center w-screen justify-around bottom-0 fixed p-2 .rounded-t-sm shadow bg-white">
            <Link to="/"><Homeicon className={`w-8 h-auto text-blue ${home ? "fill-current" : null}`} onClick={() => activeicon('home')}/></Link>
            <Link to="/search"><Searchicon onClick={() => activeicon()} className={`${search ? "text-blue-200" : null} w-8 h-auto  stroke-current fill-current`} /></Link>
            
            <div className="flex relative justify-center w-8">
                <Animatedplus className="w-8 h-auto absolute z-10" style={plusprops} onClick={() => toggleActive()} />
                <Link to="/createpost"><animated.button className="btn absolute bg-blue-gray text-white rounded-lg p-2 text-xl w-16" style={postprops} >Post</animated.button></Link>
                <Link to="/createquestion"><animated.button className="btn absolute bg-blue-gray text-white rounded-lg p-2 text-xl w-16" style={askprops} >Ask</animated.button></Link>
            </div>
            {/* <Link to="/post"><Addicon className="w-8 h-auto"/></Link> */}
            <Link to ="/message"><Messageicon className="w-8 h-auto" /></Link>
            {loggedIn ? 
            <Link to={`/profile/${loggedIn.data.name}`}><Profileicon className="w-8 h-auto"/></Link>
            : null}
            </div>
    );
}

export default BottomNav;
