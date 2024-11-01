import { Button, Flex, Input } from 'antd'
import { PageContainer } from '@ant-design/pro-layout'
import { DeleteOutlined } from '@ant-design/icons'
import type { GetProps, TabPaneProps } from 'antd'
import { useCallback, useEffect, useState } from 'react'
import AddNewRoom from '@renderer/components/studentAbility/addNewRoom'
import { learnStorage } from '@renderer/utils/auth'
import { CreateLesson } from './teacher/createLesson'
import { TeacherCourse } from './teacher/TeacherCourse'
// import { Route, Routes } from 'react-router-dom'
import { StudentCourse } from './student/StudentCourse'

import '@renderer/assets/styles/message/index.scss'
import AIsendAll from '@renderer/components/AI/AIchatAll'
type SearchProps = GetProps<typeof Input.Search>
const { Search } = Input

function Asset(): JSX.Element {
  const [role, setRole] = useState(null)
  const [tabList, setTabList] = useState<
    (TabPaneProps & {
      key?: React.Key
    })[]
  >([])
  const fetchRole = useCallback(async () => {
    try {
      const res = await learnStorage.getItem('role')
      setRole(res)
    } catch (error) {
      console.error(error)
    }
  }, [])
  useEffect(() => {
    fetchRole()
  }, [fetchRole])
  useEffect(() => {
    if (role) {
      const tabs =
        role == 1
          ? [
            {
              tab: '教学课程',
              key: '1',
              children: <TeacherCourse />
            }
          ]
          : [
            {
              tab: '学习课程',
              key: '2',
              children: <StudentCourse />
            }
          ]
      setTabList(tabs)
    }
  }, [role])
  const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value)
  return (
    <div>
      <Flex justify="space-between">
        <Flex gap={20}>{role == 1 ? <CreateLesson /> : <AddNewRoom />}</Flex>
        <Flex gap={20}>
          <Search
            placeholder="搜索课程"
            allowClear
            enterButton="搜索"
            size="middle"
            onSearch={onSearch}
          />
        </Flex>
      </Flex>
      <PageContainer
        className="assetContainer"
        title={false}
        fixedHeader
        tabList={tabList}
        tabBarExtraContent={
          <Button type="primary" icon={<DeleteOutlined />}>
            回收站
          </Button>
        }
      >
        <AIsendAll />

      </PageContainer>
    </div>
  )
}

export default Asset