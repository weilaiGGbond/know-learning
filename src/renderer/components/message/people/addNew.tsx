import { Avatar, Badge, Button, Input, List, Modal, Radio } from 'antd';
import React, { useState } from 'react'
import icon from '@renderer/assets/img/image.png'
import { ExclamationCircleOutlined } from '@ant-design/icons';
export default function AddNew() {
    const { Search } = Input;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const data = [
        {
            title: '鹤归江野',

            read: false
        },
        {
            title: '鹤归江野',

            read: false
        },
        {
            title: '鹤归江野',

            read: false
        },
        {
            title: '鹤归江野',

            read: true
        },
    ];
    const showModal = () => {
        setIsModalOpen(true);
    };
    const { confirm } = Modal;
    const handleOk = () => {
        confirm({
            title: '邀请入群',
            content: '确定邀请入群吗',
            okText: '确定',
          cancelText: '取消',
            onOk() {
                setIsModalOpen(false);
                console.log('OK');
            },
            onCancel() {
                console.log('Cancel');
            },
        });

    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const onSearch = () => {

    }
    return (
        <div>
            <Button type="primary" size='small' onClick={showModal}>
                邀请入群
            </Button>
            <Modal title="邀请入群" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Search
                    placeholder="通过学号或姓名搜索"
                    allowClear
                    enterButton="搜索"
                    size="large"
                    onSearch={onSearch}
                />
                <List className='addnewPeople'
                    itemLayout="horizontal"
                    dataSource={data}
                    renderItem={item => (
                        <List.Item className='hoverIcon'>
                            <List.Item.Meta
                                avatar={

                                    <Avatar src={icon} />

                                }
                                title={item.title}

                            />
                            <Radio>

                            </Radio>
                        </List.Item>
                    )}
                />
            </Modal>
        </div>
    )
}
