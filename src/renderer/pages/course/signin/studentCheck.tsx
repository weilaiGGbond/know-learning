import { useEffect, useState } from 'react'
import { Button, message, Modal } from 'antd'
import BaiduMap from '@renderer/components/BaiduMap'
import { EnvironmentFilled } from '@ant-design/icons'
import { studentSign } from '@renderer/api/student'
import { useSelector } from 'react-redux'
import { useCourse } from '..'

const StudentCheck = ({ lastMessage, sendMessage }) => {
  const { lessonId } = useCourse()
  const userInfo = useSelector((state: any) => state.person.userInfo)
  const [signId, setSignId] = useState(0)
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [position, setPosition] = useState<{ longitude: number; latitude: number }>({
    longitude: 0,
    latitude: 0
  })
  useEffect(() => {
    if (lastMessage.signId) {
      setSignId(lastMessage.signId)
    }
  }, [lastMessage])
  const showModal = () => {
    setOpen(true)
  }

  const handleOk = () => {
    setLoading(true)
    if (position.longitude === 0 || position.latitude === 0) {
      message.error('位置信息获取失败，请重新获取位置信息后重试')
      return
    }
    console.log(position, 'position', lastMessage)
    studentSign({
      longitude: position.longitude,
      latitude: position.latitude,
      signId: signId
    }).then((res) => {
      if (res) {
        console.log(res)
        sendMessage(
          JSON.stringify({
            lessonId,
            type: 1,
            msg: {
              ...userInfo
            }
          })
        )
        message.success('签到成功')
        // 获取个人信息
      }
    })
    setTimeout(() => {
      setLoading(false)
      setOpen(false)
    }, 3000)
  }

  const handleCancel = () => {
    setOpen(false)
  }

  const getCheck = (value: { longitude: number; latitude: number }) => {
    setPosition(value)
  }

  return (
    <>
      <Button type="primary" onClick={showModal} icon={<EnvironmentFilled />}>
        位置签到
      </Button>
      <Modal
        open={open}
        title="位置签到"
        onCancel={handleCancel}
        footer={[
          <Button loading={loading} onClick={handleCancel}>
            取消
          </Button>,
          <Button type="primary" loading={loading} onClick={handleOk}>
            签到
          </Button>
        ]}
      >
        <div className="h-[300px] w-full">
          <BaiduMap getCheck={(value) => getCheck(value)} />
        </div>
      </Modal>
    </>
  )
}

export default StudentCheck
