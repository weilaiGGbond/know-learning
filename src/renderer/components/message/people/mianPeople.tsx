//右边弹出框
import React, { useCallback, useState } from 'react';
import { Drawer, Button, Radio, DrawerProps, Space, Avatar, Descriptions, RadioChangeEvent } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import '@renderer/assets/styles/message/index.scss'
import AddNew from './addNew';
import GroupList from '../group/groupList';
import { getInvite } from '@renderer/api/teacher';
export default function MianPeople({ contact }) {
    const [open, setOpen] = useState(false);
    const [placement] = useState<DrawerProps['placement']>('right')
    const [QRstring, setQRstring] = useState('');
    const [lessonId] = useState(1);

    const showDrawer = () => {
       
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };
    const [size, setSize] = useState<'default' | 'middle' | 'small'>('default');

    const onChange = (e: RadioChangeEvent) => {
        console.log('size checked', e.target.value);
        setSize(e.target.value);
    };

    return (
        <div>
            <Button icon={<EllipsisOutlined />} shape="circle" onClick={showDrawer} />
            <Drawer
                title={
                    <Space>
                        <Avatar src={contact.avatar} alt={contact.name}>
                            {contact.name[0]}
                        </Avatar>
                        <p>
                            {contact.name}
                        </p>
                        <AddNew />
                    </Space>
                }
                placement={placement}
                closable={false}
                onClose={onClose}
                open={open}
                key={placement}
                className='rightDraw'
            >
                <div>
                    <GroupList />
                </div>
            </Drawer>
        </div>
    )
}
