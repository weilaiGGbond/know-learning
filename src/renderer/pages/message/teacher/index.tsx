import React from 'react'
import { List, Card, Typography, Tag, Space, Button } from 'antd';
import { BellOutlined, UserOutlined, TeamOutlined, SettingOutlined } from '@ant-design/icons';
import '@renderer/assets/styles/common.scss'
import "@renderer/assets/styles/message/index.scss"
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
const getIcon = (type: string) => {
    switch (type) {
        case 'system':
            return <BellOutlined style={{ color: '#1890ff' }} />;
        case 'group':
            return <TeamOutlined style={{ color: '#52c41a' }} />;
        case 'friend':
            return <UserOutlined style={{ color: '#faad14' }} />;
        case 'settings':
            return <SettingOutlined style={{ color: '#722ed1' }} />;
        default:
            return <BellOutlined />;
    }
};

const getTagColor = (type: string) => {
    switch (type) {
        case 'system':
            return 'blue';
        case 'group':
            return 'green';
        case 'friend':
            return 'gold';
        case 'settings':
            return 'purple';
        default:
            return 'default';
    }
};
const TeacherSystem = (): JSX.Element => {
    return (
        <div className='scrollBar systemMainSroll'>
            <Card style={{ width: '100%', margin: 'auto' }}>
                <Title level={4} style={{ marginBottom: 20 }}>系统通知</Title>
                <List
                    itemLayout="horizontal"
                    dataSource={notifications}
                    renderItem={(item) => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={getIcon(item.type)}
                                title={
                                    <Space>
                                        <Text strong>{item.title}</Text>
                                    </Space>
                                }
                                description={
                                    <Space direction="vertical" style={{ width: '100%' }}>
                                        <Text>{item.content}</Text>

                                        <Text type="secondary" style={{ fontSize: '12px' }}>{item.time}</Text>
                                    </Space>
                                }
                            />
                            {
                                item.type === 'friend' ? <div>
                                    <Button type="link" size="small">同意</Button>
                                    <Button type="link" style={{color:'#fc3d49',marginLeft:"10px"}} size="small">拒绝</Button>
                                </div> : null
                            }
                        </List.Item>
                    )}
                />
            </Card>
        </div>
    )
}
export default TeacherSystem