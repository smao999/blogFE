import {FC} from 'react';
import { Outlet } from 'react-router-dom';

interface IHomeLayout {}

const HomeLayout: FC<IHomeLayout> = (props) => {
    
    return (
        <div className={'flex'}>
          <div>12123</div>
          <div className={'flex-1'}>
            <Outlet/>
          </div>
        </div>
    )
};

export default HomeLayout;