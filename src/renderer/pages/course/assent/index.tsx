import { useCallback, useEffect, useState } from 'react'
import {
  Button,
  Divider,
  Flex,
  Form,
  Input,
  List,
  message,
  Modal,
  Progress,
  Skeleton,
  Upload,
  UploadProps,
  UploadFile
} from 'antd'
import { Breadcrumb } from 'antd'
import { PlusOutlined, SearchOutlined, UploadOutlined } from '@ant-design/icons'

import { useCourse } from '..'
import { createFolder, getFileList } from '@renderer/api/teacher'
import InfiniteScroll from 'react-infinite-scroll-component'
import FileUpload from '@renderer/common/upload'
import { getFileType } from './assent'

function AssetList(): JSX.Element {
  const [progress, setProgress] = useState(0)
  const [dirInfo, setDirInfo] = useState<DirType[]>([{ id: -1, name: '全部资源' }])
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [data, setData] = useState<DataType[]>([])
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)
  const [isCreateDirModalOpen, setIsCreateDirModalOpen] = useState(false)
  const [dirName, setDirName] = useState('')
  const [fileName, setfileName] = useState('')
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const { lessonId } = useCourse()
  const props: UploadProps = {
    beforeUpload: (file: UploadFile) => {
      setFileList([file])
      return false
    },
    onChange: useCallback(({ fileList }) => {
      setFileList(fileList)
    }, []),
    fileList: fileList,
    maxCount: 1
  }
  const [formState, setFormState] = useState<FormStateType>({
    docTitle: '',
    pageNum: 1,
    pageSize: 10,
    parentId: -1,
    lessonId: lessonId
  })
  const getDirInfo = useCallback((item: DataType) => {
    const newInfo = { id: item.docId, name: item.docTitle }
    setDirInfo((prev) => [...prev, newInfo])
    setData([])
    setFormState((prev) => ({ ...prev, parentId: item.docId, pageNum: 1 }))
    setHasMore(true)
  }, [])
  const changeInfo = useCallback(
    (id: number) => {
      const index = dirInfo.findIndex((item) => item.id === id)
      if (index !== -1) {
        const newInfo = dirInfo.slice(0, index + 1)
        setDirInfo(newInfo)
        setData([])
        setFormState((prev) => ({ ...prev, parentId: id, pageNum: 1 }))
        setHasMore(true)
      }
    },
    [dirInfo]
  )
  const handleCreateDir = () => {
    createFolder({
      dirName,
      parentId: formState.parentId,
      lessonId: formState.lessonId
    }).then((res) => {
      if (res) {
        // 创建成功后处理逻辑
        message.success('创建成功')
        loadMoreData()
      }
    })
    setDirName('')
    setIsCreateDirModalOpen(false)
  }
  // 创建文件
  const handleCreateFile = () => {
    if (!fileName || !fileList.length || !fileList[0].originFileObj) {
      message.warning('请填写完整信息')
      return
    }

    const fileUpload = new FileUpload(
      fileList[0].originFileObj,
      1024 * 1024 * 5,
      fileName,
      (progressValue) => {
        setProgress(progressValue) // Update progress
      }
    )
    fileUpload.startUpload()
    setIsUploadModalOpen(false)
  }

  const loadMoreData = useCallback(() => {
    if (loading || !hasMore) return
    setLoading(true)
    getFileList(formState)
      .then((body) => {
        setData((prevData) => [...prevData, ...body.data.records])

        // 检查是否还有更多页
        if (body.data.current < body.data.pages) {
          setFormState((prev) => ({ ...prev, pageNum: prev.pageNum + 1 }))
        } else {
          setHasMore(false)
        }
      })
      .catch(() => {
        setHasMore(false)
      })
      .finally(() => setLoading(false))
  }, [formState, loading, hasMore])
  useEffect(() => {
    loadMoreData()
  }, [formState.docTitle, formState.pageNum, formState.parentId])
  return (
    <div className="flex flex-col flex-grow h-full">
      <div className="flex w-full justify-between py-8 h-11 items-center border-b border-gray-300">
        <p className="CourseName pl-6 text-base font-bold text-[#131B26] sm:hidden xs:hidden lg:block">
          深入理解机器学习算法与应用：从基础理论到实际案例分析
        </p>
        <div className="flex items-center m-6">
          <Input
            style={{ borderRadius: 4, marginInlineEnd: 12 }}
            prefix={<SearchOutlined style={{ color: 'rgba(0, 0, 0, 0.15)' }} />}
            placeholder="搜索方案"
          />
          <Flex gap={5}>
            <Button
              icon={<PlusOutlined />}
              type="primary"
              onClick={() => setIsCreateDirModalOpen(true)}
            >
              新建文件夹
            </Button>
            <Button
              icon={<UploadOutlined />}
              type="primary"
              ghost
              onClick={() => setIsUploadModalOpen(true)}
            >
              上传文件
            </Button>
          </Flex>
        </div>
      </div>

      <Modal
        title="上传文件"
        open={isUploadModalOpen}
        onOk={handleCreateFile}
        onCancel={() => setIsUploadModalOpen(false)}
      >
        <Progress percent={progress} />
        <Form labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
          <Form.Item label="文件名">
            <Input value={fileName} onChange={(e) => setfileName(e.target.value)} />
          </Form.Item>
          <Form.Item label="上传文件">
            <Upload {...props}>
              <Button icon={<UploadOutlined />}>选择文件</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="新建文件夹"
        open={isCreateDirModalOpen}
        onOk={handleCreateDir}
        onCancel={() => setIsCreateDirModalOpen(false)}
      >
        <p className="mb-3 text-gray-300">为你的文件列表取名</p>
        <Form.Item label="文件夹名称">
          <Input value={dirName} onChange={(e) => setDirName(e.target.value)} />
        </Form.Item>
      </Modal>

      <Breadcrumb className="px-6 pt-2">
        {dirInfo.map((item) => (
          <Breadcrumb.Item
            key={item.id}
            onClick={() => {
              changeInfo(item.id)
            }}
            className="cursor-pointer"
          >
            {item.name}
          </Breadcrumb.Item>
        ))}
      </Breadcrumb>

      <div className="bg-white p-3">
        <Flex className="bg-[#f5f6f7] py-3 px-5 rounded-md justify-between" gap={10}>
          <p>文件名</p>
          <Flex className="justify-between w-1/3" gap={20}>
            <p className="w-2/5">创建日期</p>
            <p className="w-28 pl-4">操作</p>
          </Flex>
        </Flex>
      </div>

      <div className="overflow-y-auto srollBar px-5 pb-5 flex-1" id="scrollableDiv">
        <InfiniteScroll
          dataLength={data.length}
          next={loadMoreData}
          hasMore={hasMore}
          loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
          endMessage={<Divider plain>已经到底了...</Divider>}
          scrollableTarget="scrollableDiv"
        >
          <List
            className="w-[99%]"
            dataSource={data}
            renderItem={(item) => (
              <List.Item key={item.id}>
                <Flex align="center" gap={10} onDoubleClick={() => getDirInfo(item)}>
                  <div className="typeFile h-8 w-8">
                    <img src={getFileType(item)} alt="文件" className="w-full h-full" />
                  </div>
                  <p
                    className="nameFile text-nowrap text-ellipsis overflow-hidden max-w-md"
                    title={item.docTitle}
                  >
                    {item.docTitle}
                  </p>
                </Flex>
                <Flex className="justify-between w-1/3" gap={20} align="center">
                  <p className="w-2/5">2024-10-18</p>
                  <Flex className="w-28 text-center" justify="between">
                    <Button danger type="text">
                      删除
                    </Button>
                    {item.isDir === 0 && <Button type="link">下载</Button>}
                  </Flex>
                </Flex>
              </List.Item>
            )}
          />
        </InfiniteScroll>
      </div>
    </div>
  )
}

export default AssetList
