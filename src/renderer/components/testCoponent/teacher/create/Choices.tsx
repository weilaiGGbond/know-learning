import { Button, Input, message, Popover, Upload, UploadProps } from 'antd'
import { numberToLetter } from './create'
import {
  EditOutlined,
  UploadOutlined,
  CaretDownOutlined,
  EllipsisOutlined
} from '@ant-design/icons'
import { useState } from 'react'
interface Choice {
  ansContent: string
  isRight: number
}
const props: UploadProps = {
  name: 'file',
  action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
  headers: {
    authorization: 'authorization-text'
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList)
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`)
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`)
    }
  }
}
function ChoiceItem({
  items,
  index,
  questionType,
  onClick,
  onEdit,
  onAdd
}: {
  items: Choice
  index: number
  questionType: string
  onClick: Function
  onEdit: Function
  onAdd: Function
}): JSX.Element {
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const changeEdit = () => {
    setIsEdit(true)
  }
  const cancelEdit = () => {
    setIsEdit(false)
  }
  return (
    <div
      className={`flex gap-3 border bg-white p-3 justify-between cursor-pointer rounded items-center ${items.isRight === 1 ? 'text-green-600 border-green-600' : ''
        }`}
      onClick={() => onClick(index)}
    >
      <div className="flex gap-3 items-center">
        <div
          className={`border w-9 h-9 flex items-center justify-center rounded ${items.isRight === 1 ? 'text-green-600 border-green-600' : ''}`}
        >
          {numberToLetter(index)}
        </div>
        <div>
          {isEdit ? (
            <Input
              onBlur={cancelEdit}
              onChange={(e) => onEdit(index, e.target.value)}
              defaultValue={items.ansContent}
            />
          ) : (
            <span>{items.ansContent}</span>
          )}
        </div>
      </div>
      {questionType !== '2' && (
        <div>
          <Popover
            content={
              <div className="flex flex-col text-start">
                <Button
                  type="text"
                  size="small"
                  className="text-xs justify-start"
                  icon={<EditOutlined />}
                  onClick={() => changeEdit()}
                >
                  编辑选项
                </Button>
                <Upload {...props} className="w-full">
                  <Button
                    type="text"
                    size="small"
                    className="text-xs w-full justify-start"
                    icon={<UploadOutlined />}
                  >
                    上传图片
                  </Button>
                </Upload>
                <Button
                  type="text"
                  size="small"
                  className="text-xs justify-start"
                  icon={<CaretDownOutlined />}
                  onClick={() => onAdd(index)}
                >
                  在下方添加选项
                </Button>
              </div>
            }
            placement="bottomRight"
            trigger="click"
          >
            <Button icon={<EllipsisOutlined />} type="text"></Button>
          </Popover>
        </div>
      )}
    </div>
  )
}

export default ChoiceItem
