import React from 'react'
import { List, Card, Typography, Tag, Space, Button } from 'antd';
import { BellOutlined, UserOutlined, TeamOutlined, SettingOutlined, ReadOutlined, BgColorsOutlined, AreaChartOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
import '@renderer/assets/styles/message/index.scss'
interface Notification {
    id: number;
    title: string;
    content: string;
    type: 'system' | 'homework' | 'test' | 'memo';
    time: string;
}
const notifications: Notification[] = [
    {
        id: 1,
        title: '系统更新通知',
        content: '您的申请加入课程已同意',
        type: 'system',
        time: '10分钟前'
    },
    {
        id: 2,
        title: '作业通知',
        content: '您还有作业未完成',
        type: 'homework',
        time: '30分钟前'
    },
    {
        id: 3,
        title: '考试通知',
        content: '您还有考试未完成',
        type: 'test',
        time: '1小时前'
    },
    {
        id: 4,
        title: '备忘录更新',
        content: '您备忘录还有事项未完成',
        type: 'memo',
        time: '2小时前'
    },
];
const getIcon = (type: string) => {
    switch (type) {
        case 'system':
            return <BellOutlined style={{ color: '#1890ff' }} />;
        case 'homework':
            return <BgColorsOutlined style={{ color: '#52c41a' }} />;
        case 'test':
            return <AreaChartOutlined style={{ color: '#faad14' }} />;
        case 'memo':
            return <ReadOutlined style={{ color: '#722ed1' }} />;
        default:
            return <BellOutlined />;
    }
};

const getTagColor = (type: string) => {
    switch (type) {
        case 'system':
            return 'blue';
        case 'homework':
            return 'green';
        case 'test':
            return 'gold';
        case 'memo':
            return 'purple';
        default:
            return 'default';
    }
};
const StudentSystem = (): JSX.Element => {
    return (
        <div className='systemMainSroll'>
            <Card style={{ width: '100%', maxWidth: 800, margin: 'auto' }}>
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
                            {item.type === 'test' && <Button type='link'>点击查看</Button>}
                            {item.type === 'homework' &&<Button type='link' >点击查看</Button>}
                            {item.type === 'memo' && <Button type='link' >点击查看</Button>}
                          
                    
                        </List.Item>

                    )}
                />
            </Card>
        </div>
    )
}
export default StudentSystem