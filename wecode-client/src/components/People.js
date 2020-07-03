import React, {useState} from 'react';
import BackIcon from './utilties/CustomIcons'
import Followers from './Followers'
import Following from './Following'
const People = () => {
    const [activetab, setactivetab] = useState(true);

    return (
        <div className="">
            <div className="flex shadow py-2 bg-blue-gray text-white text-">
                {/* <Backicon className="w-16 h-auto px-4  stroke-current fill-current text-white" onClick={() => Goback()} /> */}
                <BackIcon />
                <h3 className="font-medium text-xl self-center">webstar</h3>
            </div>

            <div className="w-full flex justify-around border-t border-b border-black py-3">
                <div className="text-center font-medium text-sm" onClick={() => setactivetab(true)}>followers</div>
                <div className="text-center font-medium text-sm" onClick={() => setactivetab(false)}>following</div>
            </div>
            {
                activetab ? <Followers /> : <Following />
            }

        </div>
    )
}

export default People;