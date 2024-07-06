import {CSSProperties, FC} from 'react';
import gfm from '@bytemd/plugin-gfm'
import { Editor } from '@bytemd/react'
import zh from 'bytemd/locales/zh_Hans.json'

import 'bytemd/dist/index.css'
import './index.scss'


const plugins = [
  gfm(),
]

interface IMdEditor {
  value?: string;
  onChange?: (value: string) => void;
  style?: CSSProperties
}

const MdEditor: FC<IMdEditor> = (props) => {
  const {value = '', style = {}, onChange = value => {}} = props;
    
    return (
      <div className='rich-editor' style={style}>
        <Editor
          value={value}
          plugins={plugins}
          onChange={v => onChange(v)}
        //   locale={zh}
          uploadImages={(e: File[]) => {
            return new Promise(res => {
              console.log(e)
            })
          }}
        />
      </div>
    )
};

export default MdEditor;