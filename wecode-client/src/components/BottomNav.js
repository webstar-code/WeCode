import React from 'react'
import { Link } from 'react-router-dom';
import { ReactComponent as Homeicon} from './icons/home.svg'
import { ReactComponent as Searchicon} from './icons/search.svg'
import { ReactComponent as Addicon} from './icons/icons8-plus.svg'
import { ReactComponent as XXxx} from './icons/icons8_notification_24.png'
import { ReactComponent as Profileicon} from './icons/account_circle.svg'



const BottomNav = () => {
    return(
        <div className="container flex align-center justify-around bottom-0 fixed p-2 .rounded-t-sm shadow">
            <Link to="/"><Homeicon className="w-8 h-auto"/></Link>
            <Link to="/search"><Searchicon className="w-8 h-auto"/></Link>
            <Link to="/post"><Addicon className="w-8 h-auto"/></Link>
            <Link to="/profile"><Profileicon className="w-8 h-auto"/></Link>
        </div>
    );
}

export default BottomNav;
