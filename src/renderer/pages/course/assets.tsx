import { useEffect, useState } from 'react'
import { Avatar, Button, Divider, Input, List, Skeleton } from 'antd'
import InfiniteScroll from 'react-infinite-scroll-component'
import { SearchOutlined } from '@ant-design/icons'
import wordIcon from '@renderer/assets/img/wordIcon.png'
import pdfIcon from '@renderer/assets/img/pdfIcon.png'
import videoIcon from '@renderer/assets/img/videoIcon.png'

interface DataType {
  type: 'word' | 'video' | 'pdf' | 'img'
  name: string
  id: number
}
const iconMap: { [key in DataType['type']]: string } = {
  word: wordIcon,
  video: videoIcon,
  pdf: pdfIcon,
  img: 'imgIcon' // 假设你有一个 imgIcon
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
  let [data, setData] = useState<DataType[]>([])

  // const loadMoreData = () => {
  //   if (loading) {
  //     return
  //   }
  //   setLoading(true)
  //   fetch('https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo')
  //     .then((res) => res.json())
  //     .then((body) => {
  //       setData([...data, ...body.results])
  //       setLoading(false)
  //     })
  //     .catch(() => {
  //       setLoading(false)
  //     })
  // }

  // useEffect(() => {
  //   loadMoreData()
  // }, [])
  data = [
    {
      type: 'word',
      name: '深入理解机器学习算法与应用：从基础理论到实际案例分析',
      id: 1
    },
    {
      type: 'video',
      name: '深入理解机器学习算法与应用：从基础理论到实际案例分析',
      id: 2
    },
    {
      type: 'pdf',
      name: '深入理解机器学习算法与应用：从基础理论到实际案例分析',
      id: 3
    },
    {
      type: 'pdf',
      name: '深入理解机器学习算法与应用：从基础理论到实际案例分析',
      id: 4
    },
    {
      type: 'word',
      name: '深入理解机器学习算法与应用：从基础理论到实际案例分析',
      id: 1
    },
    {
      type: 'video',
      name: '深入理解机器学习算法与应用：从基础理论到实际案例分析',
      id: 2
    },
    {
      type: 'pdf',
      name: '深入理解机器学习算法与应用：从基础理论到实际案例分析',
      id: 3
    },
    {
      type: 'pdf',
      name: '深入理解机器学习算法与应用：从基础理论到实际案例分析',
      id: 4
    },
    {
      type: 'word',
      name: '深入理解机器学习算法与应用：从基础理论到实际案例分析',
      id: 1
    },
    {
      type: 'video',
      name: '深入理解机器学习算法与应用：从基础理论到实际案例分析',
      id: 2
    },
    {
      type: 'pdf',
      name: '深入理解机器学习算法与应用：从基础理论到实际案例分析',
      id: 3
    },
    {
      type: 'pdf',
      name: '深入理解机器学习算法与应用：从基础理论到实际案例分析',
      id: 4
    },
    {
      type: 'word',
      name: '深入理解机器学习算法与应用：从基础理论到实际案例分析',
      id: 1
    },
    {
      type: 'video',
      name: '深入理解机器学习算法与应用：从基础理论到实际案例分析',
      id: 2
    },
    {
      type: 'pdf',
      name: '深入理解机器学习算法与应用：从基础理论到实际案例分析',
      id: 3
    },
    {
      type: 'pdf',
      name: '深入理解机器学习算法与应用：从基础理论到实际案例分析',
      id: 4
    },
    {
      type: 'word',
      name: '深入理解机器学习算法与应用：从基础理论到实际案例分析',
      id: 1
    },
    {
      type: 'video',
      name: '深入理解机器学习算法与应用：从基础理论到实际案例分析',
      id: 2
    },
    {
      type: 'pdf',
      name: '深入理解机器学习算法与应用：从基础理论到实际案例分析',
      id: 3
    },
    {
      type: 'pdf',
      name: '深入理解机器学习算法与应用：从基础理论到实际案例分析',
      id: 4
    }
  ]
  return (
    <div className="flex flex-col flex-grow h-full">
      <div className="flex w-full justify-between py-5 h-11 items-center border-b border-gray-300">
        <p className="CourseName text-center w-full text-lg font-bold sm:hidden xs:hidden lg:block">
          深入理解机器学习算法与应用：从基础理论到实际案例分析
        </p>
        <SearchBox />
      </div>
      <div id="scrollableDiv" className="overflow-auto srollBar p-5 flex-1">
        <List
          grid={{
            gutter: 10,
            xs: 1,
            sm: 1,
            md: 2,
            lg: 2,
            xl: 2,
            xxl: 2
          }}
          dataSource={data}
          renderItem={(item) => (
            <List.Item key={item.id}>
              <div className="flex items-center gap-3 justify-between p-4 h-12 hover:bg-slate-300 cursor-pointer duration-300 w-full">
                <div className="typeFile h-8 w-8">
                  <img src={iconMap[item.type]} alt="文件" className="w-full h-full" />
                </div>
                <p className="nameFile w-2/4 text-nowrap text-ellipsis overflow-hidden">
                  我真的不知道起什么名字111111111111111111111111111111111111111.pdf
                </p>
                <div className="w-32 flex">
                  <Button type="text">下载</Button>
                  {item.type === 'video' && <Button type="text">播放</Button>}
                </div>
              </div>
            </List.Item>
          )}
        />
        {/* <InfiniteScroll
          dataLength={data.length}
          next={loadMoreData}
          hasMore={data.length < 50}
          loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
          endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
          scrollableTarget="scrollableDiv"
        >
         
        </InfiniteScroll> */}
      </div>
    </div>
  )
}

export default AssetList
