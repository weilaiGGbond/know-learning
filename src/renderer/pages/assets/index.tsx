import { Button, Flex, Input } from 'antd'
import { PageContainer } from '@ant-design/pro-layout'
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons'
import AssetIndex from '@renderer/components/assetIndex'
import type { GetProps } from 'antd'
type SearchProps = GetProps<typeof Input.Search>
const { Search } = Input
function Asset(): JSX.Element {
  const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value)
  return (
    <div>
      <Flex justify="space-between">
        <Flex gap={20}>
          <Button
            type="primary"
            className="bg-gradient-to-r from-indigo-400 to-blue-500 text-white duration-300"
            size="middle"
            icon={<PlusOutlined />}
          >
            新建班级
          </Button>
        </Flex>
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
        tabList={[
          {
            tab: '教学课程',
            key: '1'
          },
          {
            tab: '学习课程',
            key: '2'
          },

          {
            tab: '全部课程',
            key: '3'
          }
        ]}
        tabBarExtraContent={
          <Button type="primary" icon={<DeleteOutlined />}>
            回收站
          </Button>
        }
      >
        <Flex wrap gap={25}>
          <AssetIndex />
          <AssetIndex />
          <AssetIndex />
          <AssetIndex />
          <AssetIndex />
          <AssetIndex />
          <AssetIndex />
          <AssetIndex />
          <AssetIndex />
          <AssetIndex />
          <AssetIndex />
          <AssetIndex />
          <AssetIndex />
          <AssetIndex />
          <AssetIndex />
          <AssetIndex />
          <AssetIndex />
          <AssetIndex />
          <AssetIndex />
          <AssetIndex />
          <AssetIndex />
        </Flex>
      </PageContainer>
    </div>
  )
}

export default Asset
