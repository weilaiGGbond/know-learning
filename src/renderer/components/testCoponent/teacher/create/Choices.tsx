import { Button, Input, message, Popover, Upload, UploadProps } from 'antd'
import { uploadFile } from '@renderer/api/common/upload'
import { numberToLetter, patternImage } from './create'
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
  const props: UploadProps = {
    name: 'file',
    listType: 'picture',
    maxCount: 1,
    showUploadList: false,
    beforeUpload: () => {
      return false
    },
    onChange(info) {
      console.log(info)
      const file = info.file as unknown as File
      uploadFile(file).then((res) => {
        message.success('上传成功')
        onEdit(index, res.data)
      })
    }
  }
  return (
    <div
      className={`flex gap-3 border bg-white p-3 justify-between cursor-pointer rounded items-center ${
        items.isRight === 1 ? 'text-green-600 border-green-600' : ''
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
            <span>
              {patternImage(items.ansContent) ? (
                <img className="h-12 w-full" src={items.ansContent} />
              ) : (
                items.ansContent
              )}
            </span>
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
