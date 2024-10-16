import { Button, DatePicker, Flex, Form, Input, Modal, Select, Upload } from 'antd'
import { PageContainer } from '@ant-design/pro-layout'
import { PlusOutlined, DeleteOutlined, UploadOutlined } from '@ant-design/icons'
import AssetIndex from '@renderer/components/assetIndex'
import type { DatePickerProps, GetProps, UploadFile } from 'antd'
import { useState } from 'react'
type SearchProps = GetProps<typeof Input.Search>
const { Search } = Input

const { Option } = Select
const fileList: UploadFile[] = [
  {
    uid: '-1',
    name: 'yyy.png',
    status: 'done',
    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
  }
]
function CreateLesson(): JSX.Element {
  const [open, setOpen] = useState(false)
  const [form] = Form.useForm()
  const onGenderChange = (value: string) => {
    switch (value) {
      case 'male':
        form.setFieldsValue({ note: 'Hi, man!' })
        break
      case 'female':
        form.setFieldsValue({ note: 'Hi, lady!' })
        break
      case 'other':
        form.setFieldsValue({ note: 'Hi there!' })
        break
      default:
    }
  }

  const onFinish = (values: any) => {
    console.log(values)
  }

  const showModal = () => {
    setOpen(true)
  }

  const handleOk = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e)
    setOpen(false)
  }
  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString)
  }
  const handleCancel = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e)
    setOpen(false)
  }
  return (
    <>
      <Button
        type="primary"
        className="bg-gradient-to-r from-indigo-400 to-blue-500 text-white duration-300"
        size="middle"
        icon={<PlusOutlined />}
        onClick={showModal}
      >
        新建班级
      </Button>
      <Modal title="新建班级" open={open} onOk={handleOk} onCancel={handleCancel}>
        <Form name="control-hooks" onFinish={onFinish} style={{ maxWidth: 600 }}>
          <Form.Item name="note" label="班级封面" rules={[{ required: true }]}>
            <Upload
              action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
              listType="picture"
              defaultFileList={fileList}
            >
              <Button type="primary" icon={<UploadOutlined />}>
                Upload
              </Button>
            </Upload>
          </Form.Item>
          <Form.Item name="gender" label="课程名称" rules={[{ required: true }]}>
            <Input placeholder="请输入课程名称" />
          </Form.Item>
          <Form.Item name="time" label="结束时间" rules={[{ required: true }]}>
            <DatePicker className="w-full" onChange={onChange} placeholder="请输入课程结束日期" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

function Asset(): JSX.Element {
  const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value)
  return (
    <div>
      <Flex justify="space-between">
        <Flex gap={20}>
          <CreateLesson />
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
