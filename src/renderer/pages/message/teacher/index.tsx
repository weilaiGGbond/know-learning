import React from 'react'
import { List, Card, Typography, Tag, Space, Button } from 'antd';
import { BellOutlined, UserOutlined, TeamOutlined, SettingOutlined } from '@ant-design/icons';
import '@renderer/assets/styles/common.scss'
import "@renderer/assets/styles/message/index.scss"
import TeacherMessage from '@renderer/hook/message/teacher';
const { Title, Text } = Typography;

interface Notification {
    id: number;
    title: string;
    content: string;
    type: 'system' | 'group' | 'friend' | 'settings';
    time: string;
}
const notifications: Notification[] = [
    {
        id: 3,
        title: '好友请求',
        content: '用户"张三"加入你的班级。',
        type: 'friend',
        time: '1小时前'
    },
    {
        id: 4,
        title: '隐私设置变更',
        content: '您的账号隐私设置已更新，点击查看详情。',
        type: 'settings',
        time: '2小时前'
    },
    {
        id: 5,
        title: '隐私设置变更',
        content: '您的课程申请已通过',
        type: 'settings',
        time: '2小时前'
    },
    {
        id: 5,
        title: '隐私设置变更',
        content: '您的课程申请已通过',
        type: 'settings',
        time: '2小时前'
    },
    {
        id: 5,
        title: '隐私设置变更',
        content: '您的课程申请已通过',
        type: 'settings',
        time: '2小时前'
    },
    {
        id: 5,
        title: '隐私设置变更',
        content: '您的课程申请已通过',
        type: 'settings',
        time: '2小时前'
    },

];
const TeacherSystem = (): JSX.Element => {
    const { flag, data, teachermessageSroll, scrollRef } = TeacherMessage()
    return (
        <div ref={scrollRef} className='scrollBar systemMainSroll' onScroll={teachermessageSroll}>
            <Card style={{ width: '100%', margin: 'auto' }}>
               
                <Title level={4} style={{ marginBottom: 20 }}>系统通知</Title>
                <List
                    itemLayout="horizontal"
                    dataSource={data}
                    renderItem={(item) => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={<UserOutlined style={{ color: '#faad14' }} />}
                                title={
                                    <Space>
                                        <Text strong>{item.lessonName}</Text>
                                    </Space>
                                }
                                description={
                                    <Space direction="vertical" style={{ width: '100%' }}>
                                        <Text>{item.name}申请加入您的{item.stuClass}</Text>

                                        <Text type="secondary" style={{ fontSize: '12px' }}>{item.time}</Text>
                                    </Space>
                                }
                            />

                            <div>
                                <Button type="link" size="small">同意</Button>
                                <Button type="link" style={{ color: '#fc3d49', marginLeft: "10px" }} size="small">拒绝</Button>
                            </div>

                        </List.Item>
                    )}
                />
            </Card>
            {
                flag == true ? <p className='textNonedata'>已经到底了</p> : null
            }
        </div>
    )
}
export default TeacherSystem