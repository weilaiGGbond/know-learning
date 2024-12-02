// 教师发布签到
import { publishSign } from '@renderer/api/teacher'
import BaiduMap from '@renderer/components/BaiduMap'
import { Button, Form, InputNumber, message, Modal } from 'antd'
import { useState } from 'react'
import { useCourse } from '..'
// 获取课堂信息
function PostCheck({ sendMessage }): JSX.Element {
  const { lessonId } = useCourse()
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [from, setFrom] = useState<{
    keepTime: number
    distance: number
    userPosition: {
      longitude: number
      latitude: number
    }
    longitude: number
    latitude: number
    lessonId: number
  }>({
    keepTime: 10,
    distance: 250,
    userPosition: {
      longitude: 0,
      latitude: 0
    },
    longitude: 0,
    latitude: 0,
    lessonId: lessonId
  })
  const handlePostCheck = (value: {
    centerPoint: BMapGL.Point | undefined
    radius: number | undefined
    userPosition: {
      longitude: number
      latitude: number
    }
  }) => {
    setFrom((prev: any) => ({
      ...prev,
      longitude: value.centerPoint?.lng,
      latitude: value.centerPoint?.lat,
      distance: Math.ceil(value.radius ?? 0),
      userPosition: value.userPosition
    }))
  }
  const showModal = () => {
    //判断个人位置和圆圈中心位置是否一致
    if (
      from.longitude !== from.userPosition.longitude ||
      from.latitude !== from.userPosition.latitude
    ) {
      Modal.confirm({
        title: '您当前位置和签到中心位置不一致,是否继续发布签到?',
        content: '您可以重新选择位置或者继续发布',
        onOk() {
          setOpen(true)
        },
        onCancel() {
          setOpen(false)
        }
      })
      return
    } else {
      setOpen(true)
    }
  }

  const handleOk = () => {
    const { lessonId, keepTime, distance, longitude, latitude } = from
    setLoading(true)
    publishSign({ lessonId, keepTime, distance, longitude, latitude }).then((res) => {
      if (res) {
        console.log(res)
        sendMessage(
          JSON.stringify({
            lessonId,
            type: 1,
            msg: {
              ...res.data
            }
          })
        )
        message.success('发布成功')
        setLoading(false)
        setOpen(false)
      } else {
        message.error('发布失败')
        setLoading(false)
        setOpen(false)
      }
    })
  }

  const handleCancel = () => {
    setOpen(false)
  }
  const checkTime = (value: number | null) => {
    setFrom((prev) => ({
      ...prev,
      keepTime: value ?? 10
    }))
  }
  const checkRange = (value: number | null) => {
    setFrom((prev) => ({
      ...prev,
      distance: value ?? 250
    }))
  }

  return (
    <>
      <div className="flex justify-between items-center mb-3">
        <p>教师端发布位置签到</p>
        <Button type="primary" onClick={showModal}>
          发布签到
        </Button>
        <Modal
          open={open}
          title="发布签到"
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[
            <Button onClick={handleCancel}>取消</Button>,
            <Button type="primary" loading={loading} onClick={handleOk}>
              确定发布
            </Button>
          ]}
        >
          <p className="text-sm text-gray-300 mb-3">请确定签到时长和签到范围</p>
          <Form.Item label="持续时长">
            <InputNumber
              suffix="min"
              className="w-[250px]"
              min={3}
              max={60}
              defaultValue={from.keepTime}
              onChange={(value) => checkTime(value)}
            />
          </Form.Item>
          <Form.Item label="签到范围">
            <InputNumber
              suffix="米"
              className="w-[250px]"
              min={100}
              max={999}
              placeholder="请输入签到范围"
              value={from.distance}
              onChange={(value) => checkRange(value)}
            />
          </Form.Item>
        </Modal>
      </div>
      <div className="w-full h-96">
        <BaiduMap edit postCheck={(value) => handlePostCheck(value)} />
      </div>
    </>
  )
}

export default PostCheck
