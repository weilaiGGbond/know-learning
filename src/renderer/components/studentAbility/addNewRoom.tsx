import { EditOutlined, PlusOutlined } from '@ant-design/icons'
import { Avatar, Button, Input, List, Modal, Space } from 'antd'
import React, { useState } from 'react'
import Empty from '@renderer/assets/img/emptyMessage.png'
interface ListItem {
  title: string
  description: string
  avatar: string
}
const AddNewRoom = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [listAddnew, setListAddnew] = useState([
    {
      title: '高数',
      description: '开课人：xxx',
      avatar: ''
    }
  ]) // 假设这个状态会被更新
  const showModal = () => {
    setIsModalOpen(true)
  }
  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  return (
    <div className="dragger">
      <Button
        type="primary"
        className="bg-gradient-to-r from-indigo-400 to-blue-500 text-white duration-300"
        size="middle"
        icon={<PlusOutlined />}
        onClick={showModal}
      >
        添加课程
      </Button>
      <Modal title="填写邀请码" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Space.Compact style={{ width: '100%' }}>
          <Input defaultValue="请填写验证码" />
          <Button type="primary">确定</Button>
        </Space.Compact>
        {listAddnew.length === 0 ? (
          <img src={Empty} alt="没有数据" style={{ width: '100%', textAlign: 'center' }} />
        ) : (
          <List
            itemLayout="horizontal"
            dataSource={listAddnew}
            renderItem={(item, index) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />}
                  title={<a href="https://ant.design">{item.title}</a>}
                  description={item.description}
                />
                <div style={{ color: '#1677ff' }}>申请</div>
              </List.Item>
            )}
          />
        )}
      </Modal>
    </div>
  )
}

export default AddNewRoom
