import {FC} from 'react';

import './index.scss';

interface IMacDocker {}

const MacDocker: FC<IMacDocker> = (props) => {

    const fileIcons = [1,2,3,4,5,6,7,8,9];
    
    return (
        <div className="mac-docker-container">
            {
                fileIcons.map(item => {
                    return (
                        <div className="docker-item">{item}</div>
                    )
                })
            }
        </div>
    )
};

export default MacDocker;