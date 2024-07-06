import {FC, useState} from 'react';
import axios from "axios";
import {Button} from "antd";

interface IAbout {}

const About: FC<IAbout> = () => {
  const [content, setContent] = useState('');

  const getContent = async () => {
    const res:any = await axios.get('/api/blog?id=' + '44fe5074-b95f-4af2-9b41-9caa71ea0042');
    console.log(res)
    setContent(res.data.content)
  }


  return (
    <div>
      <Button onClick={getContent}>获取文章</Button>
      <div className="mce-content-body">{content}</div>
    </div>
  )
}

export default About