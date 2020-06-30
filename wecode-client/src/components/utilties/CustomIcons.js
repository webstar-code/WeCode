import React from 'react';
import { ReactComponent as Backicon } from '../icons/utilitiesicon/BackArrow.svg';
import {useHistory} from 'react-router-dom';


const BackIcon = () => {
    const history = useHistory();
    const Goback = () => {
        history.goBack();
    }


    return(
<Backicon className="w-8 h-auto mx-2 stroke-current fill-current text-white" onClick={() => Goback()} />

    )
}


export default BackIcon;