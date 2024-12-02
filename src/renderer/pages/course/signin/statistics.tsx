import { UserOutlined } from '@ant-design/icons'
import { Flex, List, Avatar } from 'antd'
import { useEffect, useState } from 'react'
interface statistic {
  username: string
  name: string
  stuClass: string
  sex: string
}
// 已签
const Statistics = ({ lastMessage }) => {
  const [data, setData] = useState<statistic[]>([
    {
      username: '20241018001',
      name: '张三',
      stuClass: '计算机科学与技术1班',
      sex: '男'
    },
    {
      username: '20241018002',
      name: '李四',
      stuClass: '计算机科学与技术1班',
      sex: '女'
    }
  ])

  useEffect(() => {
    const { data } = lastMessage
    if (lastMessage.data) {
      setData((prev) => ({ ...prev, data }))
    }
  }, [lastMessage])
  return (
    <>
      <div className="statistics">
        <div className="bg-white">
          <Flex className="bg-[#f5f6f7] py-3 px-5 rounded-md justify-between" gap={10}>
            <p className="text-green-600">已签学生列表</p>
            <Flex className="justify-start w-4/5" gap={20}>
              <p className="w-2/5">学号</p>
              <p className="w-28 pl-4">班级</p>
            </Flex>
          </Flex>
        </div>
        <div className="px-5">
          <List
            dataSource={data}
            renderItem={(item, index) => (
              <List.Item key={index} className="justify-between">
                <div className="flex items-center gap-3">
                  <Avatar
                    icon={<UserOutlined />}
                    className={item.sex == '男' ? 'bg-[#00A2AE]' : 'bg-red-300'}
                    size={35}
                  />
                  <p>{item.name}</p>
                </div>
                <Flex className="justify-start w-4/5" gap={20}>
                  <p className="w-2/5">{item.username}</p>
                  <p className="w-2/5 pl-4">{item.stuClass}</p>
                </Flex>
              </List.Item>
            )}
          />
        </div>
      </div>
    </>
  )
}
export default Statistics
