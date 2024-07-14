import React, {memo, useEffect, useState} from 'react'
import axios from "axios";

import {Button, Form, Input, Select, Popconfirm } from 'antd'
import MdEditor from '@/components/MdEditor';

const File = memo(() => {
    const [form] = Form.useForm();
    const [category, setCategory] = useState<Array<any>>([]);
    const [newCategory, setNewCategory] = useState<string>('');
    const service = axios.create({
        baseURL: '/api',
        timeout: 5000
    })
    const submit = () => {
        form.validateFields().then(res => {
            service.post('/blog/add', {...res}).then(res => {
                console.log(res)
            })
        })
    }

    useEffect(() => {
        service.get('/blog/category').then(res => {
            setCategory(res?.data || [])
        })
    }, []);

  return (
    <div className={'p-6 h-screen pb-0 !overflow-y-hidden flex box-border gap-5'}>
        <div className=' flex-1'>
          <Form form={form} className=' flex flex-col h-full'>
              <div className={'flex justify-between'}>
                  <Form.Item className={'w-[500px]'} required name="title">
                      <Input placeholder={"请输入文章标题"}/>
                  </Form.Item>
                  <div className=' flex gap-4'>
                    <Form.Item className={'w-[280px]'} name="categorys">
                        <Select
                          mode="multiple"
                          placeholder={'选择分类'}
                          options={category?.map((item:any) => ({value: item.id, label: item.name}))}
                        />
                    </Form.Item>
                    <Popconfirm
                      icon={null}
                      title='添加分类'
                      cancelText='取消'
                      okText='添加'
                      description={
                        <Input
                          placeholder={"请输入分类名称"}
                          value={newCategory}
                          onChange={e => setNewCategory(e.target.value)}
                        />
                      }
                      onConfirm={_ => {
                        service.post('/blog/category',{name: newCategory})
                      }}
                      onCancel={_ => setNewCategory('')}
                    >
                      <Button>添加分类</Button>
                    </Popconfirm>
                    <Button type="primary" onClick={submit}>发布</Button>
                  </div>
              </div>
              <Form.Item className={'!mb-0 flex-1'} required noStyle name="content">
                <MdEditor style={{height: 'calc(100% - 56px)'}} />
              </Form.Item>
          </Form>
        </div>
    </div>
  )
})

export default File