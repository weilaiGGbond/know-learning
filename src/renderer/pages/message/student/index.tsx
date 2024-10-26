import React, { useEffect } from 'react'
import { List, Card, Typography, Tag, Space, Button, Skeleton, Divider } from 'antd';
import { BellOutlined, UserOutlined, TeamOutlined, SettingOutlined, ReadOutlined, BgColorsOutlined, AreaChartOutlined } from '@ant-design/icons';
const { Title, Text } = Typography;
import '@renderer/assets/styles/message/index.scss'
import useStudentMessage from '@renderer/hook/message/student';
import Utils from '@renderer/utils/util';
import InfiniteScroll from 'react-infinite-scroll-component';
const StudentSystem = (): JSX.Element => {
    const { pages,page, data, getTeacherApply } = useStudentMessage()
    return (
        <div className='systemMainSroll'>
            <   div id="scrollableDiv" style={{ width: '100%', maxWidth: 800, margin: 'auto' }}>
                <Title level={4} style={{ marginBottom: 20 }}>课程通知</Title>

                {/* <List
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
                /> */}
                <InfiniteScroll
                    dataLength={data.length}
                    next={getTeacherApply}
                    hasMore={pages>page}
                    loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
                    endMessage={<Divider plain>暂时没有更多</Divider>}
                    scrollableTarget="scrollableDiv"
                >

                <List
                    dataSource={data}
                    renderItem={(item) => (
                        <List.Item key={item.updateTime}>
                            <List.Item.Meta
                                avatar={<BellOutlined style={{ color: '#1890ff' }} />}
                                title={
                                    <Space>
                                        <Text strong>申请入课程通知</Text>
                                    </Space>
                                }
                                description={
                                    <Space direction="vertical" style={{ width: '100%' }}>
                                        <Text>{item.lessonName}</Text>
                                        <Text type="secondary" style={{ fontSize: '12px' }}>{Utils.timeAgo(item.updateTime)}</Text>
                                    </Space>
                                }
                            />

                        </List.Item>
                    )}
                />
            </InfiniteScroll>
        </div>
        </div >
    )
}
export default StudentSystem