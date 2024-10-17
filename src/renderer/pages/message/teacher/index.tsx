import React from 'react'
import { List, Card, Typography, Tag, Space } from 'antd';
import { BellOutlined, UserOutlined, TeamOutlined, SettingOutlined } from '@ant-design/icons';

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
        id: 1,
        title: '系统更新通知',
        content: 'QQ将于今晚22:00-23:00进行系统维护，请提前保存重要信息。',
        type: 'system',
        time: '10分钟前'
    },
    {
        id: 2,
        title: '群公告更新',
        content: '技术交流群更新了新的群规，请所有成员查看并遵守。',
        type: 'group',
        time: '30分钟前'
    },
    {
        id: 3,
        title: '好友请求',
        content: '用户"张三"请求添加您为好友。',
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
        <div>
            <Card style={{ width: '100%', maxWidth: 600, margin: 'auto' }}>
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
                                        <Tag color={getTagColor(item.type)}>{item.type}</Tag>
                                    </Space>
                                }
                                description={
                                    <Space direction="vertical" style={{ width: '100%' }}>
                                        <Text>{item.content}</Text>
                                        <Text type="secondary" style={{ fontSize: '12px' }}>{item.time}</Text>
                                    </Space>
                                }
                            />
                        </List.Item>
                    )}
                />
            </Card>
        </div>
    )
}
export default TeacherSystem