import { UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Descriptions } from 'antd'
import React, { useState } from 'react'

export default function GroupList() {
    const [size] = useState<'default' | 'middle' | 'small'>('default');
    return (
        <div className='grouplistMain'>
            <Descriptions title="群聊成员" size={size} extra={<Button type="link">查看群成员</Button>}>
                <div className='groupList'>
                <Avatar icon={<UserOutlined />} />
                <Avatar icon={<UserOutlined />} className='groupList__avater'/>
                <Avatar icon={<UserOutlined />} className='groupList__avater'/>
                <Avatar icon={<UserOutlined />} className='groupList__avater'/>
                <Avatar icon={<UserOutlined />} className='groupList__avater'/>
                <Avatar icon={<UserOutlined />} className='groupList__avater'/>
                <Avatar icon={<UserOutlined />} className='groupList__avater'/>
                </div>
            </Descriptions>
        </div>
    )
}
