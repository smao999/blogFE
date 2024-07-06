import {FunctionComponent} from 'react'
import {useNavigate} from 'react-router-dom'

import UnfoldIcon from './component/UnfoldIcon'
import './index.scss'

interface IHomeProps {}

const Home: FunctionComponent<IHomeProps> = () => {
  const navigate = useNavigate();

  return (
      <div>
        <UnfoldIcon />
        <div className='home-banner'>
          <div className='banner-text'>
            <span>XQS-Blog</span>
            {/*<p>每一个不曾起舞的日子，都是对生命的辜负</p>*/}
            <p>且视他人之疑目如盏盏鬼火，大胆地去走你的夜路</p>
            <div><button onClick={() => navigate('/category')}>Enter Blog</button></div>
          </div>
        </div>
        <div className={'text-center w-[100%] fixed bottom-0'}>
            <a className={'text-blue-900'} href="https://beian.miit.gov.cn/" target="_blank">蜀ICP备2024047297号-1</a>
        </div>
      </div>
  )
}

export default Home