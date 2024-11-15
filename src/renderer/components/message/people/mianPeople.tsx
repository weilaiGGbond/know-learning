//右边弹出框
import React, { useCallback, useEffect, useState } from 'react';
import { Drawer, Button, Radio, DrawerProps, Space, Avatar, Descriptions, RadioChangeEvent } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import '@renderer/assets/styles/message/index.scss'
import AddNew from './addNew';
import { useChatContext } from '@renderer/components/message/messPeople'
import GroupList from '../group/groupList';
import { learnStorage } from '@renderer/utils/auth';
export default function MianPeople() {
    const [open, setOpen] = useState(false);
    const [placement] = useState<DrawerProps['placement']>('right')
    const showDrawer = () => {

        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };
    const [size, setSize] = useState<'default' | 'middle' | 'small'>('default');
    const { chatMessage } = useChatContext()
    let role;
    const getRole = (async () => {
        role = await learnStorage.getItem('role')
    })
    useEffect(() => {
        getRole()
    }, [])
    return (
        <div>
            <Button icon={<EllipsisOutlined />} shape="circle" onClick={showDrawer} />
            <Drawer
                title={
                    <Space>
                        <Avatar src={chatMessage.coverUrl}>

                        </Avatar>
                        <span>{chatMessage.lessonName}</span>
                        {
                            role === '1'?
                                <AddNew />
                                : null
                        }
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
