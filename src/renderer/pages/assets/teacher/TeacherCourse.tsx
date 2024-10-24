import { getLessonList } from '@renderer/api/teacher'
import AssetIndex from '@renderer/components/assetIndex'
import { Divider, Flex, Skeleton } from 'antd'
import { useCallback, useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Link } from 'react-router-dom'

interface DataType {
  lessonId: number
  lessonName: string
  coverUrl: string
  createTime: string
  endTime?: string
}

// 获取教师课程
export function TeacherCourse(): JSX.Element {
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [list, setList] = useState<DataType[]>([])
  const [formState, setFormState] = useState({
    name: '',
    pageNum: 1,
    pageSize: 10
  })

  const loadMoreData = useCallback(() => {
    if (loading) {
      return
    }
    setLoading(true)
    getLessonList(formState)
      .then((body) => {
        console.log(body)

        if (body.data.records.length > 0) {
          setFormState((prev) => ({ ...prev, pageNum: prev.pageNum + 1 }))
          setList([...list, ...body.data.records])
        } else if (body.data.records.length < formState.pageSize) {
          setHasMore(false)
        }
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }, [formState])
  useEffect(() => {
    loadMoreData()
  }, [loadMoreData])

  return (
    <InfiniteScroll
      dataLength={list.length}
      next={loadMoreData}
      hasMore={hasMore}
      loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
      endMessage={<Divider plain>已经到底了...</Divider>}
      scrollableTarget="scrollableDiv"
    >
      <Flex wrap gap={25}>
        {list.map((data) => (
          <Link to={`/course/${data.lessonId}`} key={data.lessonId}>
            <AssetIndex data={data} />
          </Link>
        ))}
      </Flex>
    </InfiniteScroll>
  )
}
