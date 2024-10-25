import React from 'react';
import { List, Card, Typography, Space, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import '@renderer/assets/styles/common.scss';
import "@renderer/assets/styles/message/index.scss";
import TeacherMessage from '@renderer/hook/message/teacher';

const { Title, Text } = Typography;

const TeacherSystem = (): JSX.Element => {
    const { flag, data, teachermessageSroll, scrollRef, argeeNewStudent, refuseNewStudent } = TeacherMessage();
    return (
        <div ref={scrollRef} className='scrollBar systemMainSroll' onScroll={teachermessageSroll}>
            <Card style={{ width: '100%', margin: 'auto' }}>
                <Title level={4} style={{ marginBottom: 20 }}>课程通知</Title>
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
                                        {/* <Text type="secondary" style={{ fontSize: '12px' }}>{item.time}</Text> */}
                                    </Space>
                                }
                            />
                            <div>
                                {item.status === 0 && (
                                    <>
                                        <Button type="link" size="small" onClick={() => argeeNewStudent(item.lessonStuId)}>同意</Button>
                                        <Button type="link" onClick={() => refuseNewStudent(item.lessonStuId)} style={{ color: '#fc3d49', marginLeft: "10px" }} size="small">拒绝</Button>
                                    </>
                                )}
                                {item.status === 1 && <Text type="success">已同意</Text>}
                                {item.status === 2 && <Text type="danger">已拒绝</Text>}
                            </div>
                        </List.Item>
                    )}
                />
            </Card>
            {flag && <p className='textNonedata'>已经到底了</p>}
        </div>
    );
};

export default TeacherSystem;
