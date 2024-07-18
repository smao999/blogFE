import {FC, useState} from 'react';
import axios from "axios";
import {Button} from "antd";

interface IAbout {}

const About: FC<IAbout> = () => {
  const [content, setContent] = useState('');

  const getContent = async () => {
    const res:any = await axios.get('/api/blog?id=' + '7ee19253-4977-405f-9c0f-371cc242d417');
    console.log(res)
    setContent(res.data.content)
  }


  return (
    <div>
      <Button onClick={getContent}>获取文章1</Button>
      <div className="mce-content-body">{content}</div>
    </div>
)
}

export default About