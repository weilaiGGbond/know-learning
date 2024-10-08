import { useEffect, useState } from 'react'
import { Avatar, Divider, Input, List, Skeleton } from 'antd'
import InfiniteScroll from 'react-infinite-scroll-component'
import { SearchOutlined } from '@ant-design/icons'

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

const SearchBox = () => (
  <div
    aria-hidden
    style={{ display: 'flex', alignItems: 'center', marginInlineEnd: 24 }}
    onMouseDown={(e) => {
      e.stopPropagation()
      e.preventDefault()
    }}
  >
    <Input
      style={{
        borderRadius: 4,
        marginInlineEnd: 12,
        backgroundColor: 'rgba(0,0,0,0.03)'
      }}
      prefix={<SearchOutlined style={{ color: 'rgba(0, 0, 0, 0.15)' }} />}
      placeholder="搜索方案"
    />
  </div>
)

function AssetList(): JSX.Element {
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
    <div className="flex flex-col flex-grow h-full">
      <div className="flex w-full justify-between py-5 h-11 items-center border-b border-gray-300">
        <p className="CourseName text-center w-full text-lg font-bold">
          深入理解机器学习算法与应用：从基础理论到实际案例分析
        </p>
        <SearchBox />
      </div>
      <div id="scrollableDiv" className="overflow-auto srollBar p-5 flex-1">
        <InfiniteScroll
          dataLength={data.length}
          next={loadMoreData}
          hasMore={data.length < 50}
          loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
          endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
          scrollableTarget="scrollableDiv"
        >
          <List
            grid={{
              gutter: 0,
              xs: 1,
              sm: 1,
              xl: 2,
            }}
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
      </div>
    </div>
  )
}

export default AssetList
