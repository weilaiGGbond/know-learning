import { Button, DatePicker, Form, Input, message, Modal, Upload } from 'antd'
import { PlusOutlined, UploadOutlined } from '@ant-design/icons'
import type { DatePickerProps, UploadFile, UploadProps } from 'antd'
import { useCallback, useState } from 'react'
import { creatLesson } from '@renderer/api/teacher'
interface FileType extends UploadFile {
  url?: string
}

export function CreateLesson(): JSX.Element {
  const [formState, setFormState] = useState({
    open: false,
    fileList: [] as FileType[],
    lessonName: '',
    end: ''
  })
  const changeDate: DatePickerProps['onChange'] = useCallback((_: any, dateString: any) => {
    setFormState((prev) => ({ ...prev, end: dateString }))
  }, [])
  const changeLessonName: React.ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    setFormState((prev) => ({ ...prev, lessonName: e.target.value }))
  }, [])
  const props: UploadProps = {
    beforeUpload: (file: FileType) => {
      if (!file.originFileObj) return false
      file.url = URL.createObjectURL(file.originFileObj)
      setFormState((prev) => ({ ...prev, fileList: [file] }))
      return false
    },
    onChange: useCallback(({ fileList }) => {
      setFormState((prev) => ({ ...prev, fileList: fileList }))
    }, []),
    fileList: formState.fileList,
    listType: 'picture',
    maxCount: 1
  }
  const showModal = useCallback(() => {
    setFormState((prev) => ({ ...prev, open: true }))
  }, [])

  const handleOk = useCallback(() => {
    console.log(formState)

    if (!formState.fileList.length || !formState.lessonName || !formState.end) {
      message.warning('请填写完整信息')
    } else {
      const formdata = new FormData()
      if (formState.fileList.length === 1) {
        formdata.append('file', formState.fileList[0].originFileObj as File)
      }
      const { end, lessonName } = formState
      creatLesson({ end, lessonName }, formdata).then(() => {
        message.success('创建成功')
        setFormState((prev) => ({ ...prev, open: false }))
      })
    }
  }, [formState])

  const handleCancel = useCallback(() => {
    setFormState((prev) => ({ ...prev, open: false }))
  }, [])
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
      <Modal title="新建班级" open={formState.open} onOk={handleOk} onCancel={handleCancel}>
        <Form name="control-hooks" style={{ maxWidth: 600 }}>
          <Form.Item label="班级封面">
            <Upload {...props}>
              <Button type="primary" icon={<UploadOutlined />}>
                上传图片
              </Button>
            </Upload>
          </Form.Item>
          <Form.Item label="课程名称">
            <Input placeholder="请输入课程名称" onChange={changeLessonName} />
          </Form.Item>
          <Form.Item label="结束时间">
            <DatePicker
              className="w-full"
              showTime
              onChange={changeDate}
              placeholder="请输入课程结束日期"
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
