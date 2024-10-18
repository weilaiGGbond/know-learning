import { Button, Card, Flex, Popover } from 'antd'
import '@renderer/assets/styles/common.scss'
import { MoreOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { learnStorage } from '@renderer/utils/auth'

interface CourseType {
  lessonId: number
  lessonName: string
  coverUrl: string
  createTime: string
  endTime?: string
}

interface Props {
  data: CourseType
}

function AssetIndex({ data }: Props): JSX.Element {
  const [role, setRole] = useState(null)

  useEffect(() => {
    const getRole = async () => {
      const res = await learnStorage.getItem('role')
      setRole(res)
    }
    getRole()
  }, [])

  const filterData = (timestamp: string | number | Date) => {
    const date = new Date(timestamp)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const formattedDate = `${year}-${month}-${day}`
    return formattedDate
  }

  const content = (
    <Flex vertical gap={5}>
      <Button type="text">编辑</Button>
      <Button type="text">删除</Button>
    </Flex>
  )

  return (
    <div>
      <Card
        hoverable
        className="AssetIndex"
        style={{ width: 200 }}
        cover={
          <div className="w-full h-24 overflow-hidden">
            <img alt="example" className="w-full" src={data.coverUrl} />
          </div>
        }
      >
        <div>
          <Flex align="center" justify="space-between">
            <div>
              <p className="font-bold">{data.lessonName}</p>
              <p className="mt-1.5 text-xs text-slate-400">
                创建时间：{filterData(data.createTime)}
              </p>
            </div>
            {role == 1 ? (
              <div className="w-7 h-7" onClick={(e) => e.preventDefault()}>
                <Popover className="p-0" content={content} trigger="click" placement="bottom">
                  <Button icon={<MoreOutlined />} type="text"></Button>
                </Popover>
              </div>
            ) : null}
          </Flex>
        </div>
      </Card>
    </div>
  )
}

export default AssetIndex
