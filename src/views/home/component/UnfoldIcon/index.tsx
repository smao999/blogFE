import {FC, useState} from "react";
import {useNavigate} from "react-router-dom";
import classNames from "classnames";

import './index.scss'

interface IUnfoldIcon {}

const UnfoldIcon: FC<IUnfoldIcon> = props => {
    const navigate = useNavigate()
    const [isAnimation, setIsAnimation] = useState(false)
    const [iconClassName, setIconClassName] = useState('header-icon')
    const [navClassName, setNavClassName] = useState('rNav')

    const handleChangeIcon = () => {
        setIsAnimation(!isAnimation)
        if(iconClassName !== 'header-icon icon-out') {
            setIconClassName('header-icon icon-out');
        }
        if(isAnimation) {
            setNavClassName('rNav')
        } else {
            setNavClassName('rNav showNav')
        }
    };

    const nav = () => {
        return [
            {name: '首页', path: '/'},
            {name: '富文本', path: '/about'},
            {name: '分类', path: '/category'},
            {name: '文件', path: '/file'},
        ]
    };

  return (
      <>
          <div className={classNames((isAnimation ? 'header-icon1 icon-click' : iconClassName), 'headerIcon')} onClick={handleChangeIcon}>
              <span></span><span></span><span></span>
          </div>
          <div className={navClassName}>
              <div className='nav'>
                  <div className={'w-[140px] h-[500px] absolute top-[170px] right-0'}>
                      {
                          nav().map(item => {
                              return (
                                  <div key={item.path} className={'h-[60px] leading-[60px] text-[18px] text-slate-800 cursor-pointer hover:text-blue-400'}
                                       onClick={() => navigate(item.path)}>{item.name}</div>
                              )
                          })
                      }
                  </div>
              </div>
          </div>
      </>
  )
};

export default UnfoldIcon;
