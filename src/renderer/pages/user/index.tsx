import { PageContainer } from '@ant-design/pro-components'
import example from '@renderer/assets/example.webp'
import { Button, Descriptions, DescriptionsProps } from 'antd'
// 个人中心
const items: DescriptionsProps['items'] = [
  {
    key: '1',
    label: '姓名',
    children: 'Zhou Maomao'
  },
  {
    key: '2',
    label: '个性签名',
    children: '囡亾╮个性如此狂野莮亾╮个性如此张扬'
  },
  {
    key: '3',
    label: '所属单位',
    children: 'Hangzhou, Zhejiang'
  }
]
import { useEffect, useState } from 'react'
import { Avatar, Divider, List, Skeleton } from 'antd'
import InfiniteScroll from 'react-infinite-scroll-component'

interface DataType {
  gender: string
  name: {
    title: string
    first: string
    last: string
  }
  email: string
  picture: {
    large: string
    medium: string
    thumbnail: string
  }
  nat: string
}

function PersonCenter(): JSX.Element {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<DataType[]>([])

  const loadMoreData = () => {
    if (loading) {
      return
    }
    setLoading(true)
    fetch('https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo')
      .then((res) => res.json())
      .then((body) => {
        setData([...data, ...body.results])
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    loadMoreData()
  }, [])
  return (
    <div className="sm:block lg:flex lg:gap-10 lg:justify-between p-5 pt-0 duration-300">
      <div className="sm:w-full sm:flex sm:sticky sm:top-16 sm:items-center rounded-xl lg:w-1/4 lg:block bg-white duration-300 p-10 h-fit ">
        {/* 个人信息 */}
        <div className="rounded-full w-24 h-24 m-auto overflow-hidden ">
          <img src={example} alt="用户" className="w-full h-full" />
        </div>
        <Descriptions className=" sm:w-2/3 sm:mt-0 lg:w-full lg:mt-4" items={items} column={1} />
        <div className="flex items-center gap-5 sm:flex-col sm:mt-0 lg:flex-row lg:mt-10">
          <Button type="primary">账号管理</Button>
          <Button>退出登录</Button>
        </div>
      </div>
      <div className="w-full sm:mt-10 lg:mt-0">
        <PageContainer
          className=" bg-white rounded-xl userContainer"
          title={false}
          fixedHeader
          tabList={[
            {
              tab: '待办',
              key: '1'
            },
            {
              tab: '笔记',
              key: '2'
            },

            {
              tab: '书架',
              key: '3'
            }
          ]}
        >
          <InfiniteScroll
            dataLength={data.length}
            next={loadMoreData}
            hasMore={data.length < 50}
            loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
            endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
            scrollableTarget="scrollableDiv"
          >
            <List
              dataSource={data}
              renderItem={(item) => (
                <List.Item key={item.email}>
                  <List.Item.Meta
                    avatar={<Avatar src={item.picture.large} />}
                    title={<a href="https://ant.design">{item.name.last}</a>}
                    description={item.email}
                  />
                  <div>Content</div>
                </List.Item>
              )}
            />
          </InfiniteScroll>
        </PageContainer>
      </div>
    </div>
  )
}

export default PersonCenter
