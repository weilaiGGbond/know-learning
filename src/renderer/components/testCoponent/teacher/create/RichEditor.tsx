import { useEffect, useRef } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
interface RichTextEditorProps {
  value: string
  onChange: (value: any) => void
  placeholder?: string
  getJSON: any
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  placeholder,
  getJSON
}) => {
  const editorRef = useRef<ReactQuill>(null)

  // 实时更新 JSON 数据
  const handleJSON = () => {
    if (editorRef.current) {
      const quill = editorRef.current.getEditor()
      const delta = quill.getContents()
      return JSON.stringify(delta, null, 2)
    }
    return '{}'
  }

  // 每次内容变化时调用
  const handleChange = (content: string) => {
    onChange(content) // 更新内容到父组件
    const json = handleJSON() // 获取最新 JSON
    getJSON(json) // 通知父组件 JSON 数据
  }

  const modules = {
    toolbar: [
      [{ font: [] }],
      [{ header: 1 }, { header: 2 }],
      ['blockquote', 'code-block'],
      ['image'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ script: 'sub' }, { script: 'super' }],
      [{ indent: '-1' }, { indent: '+1' }],
      ['bold', 'italic'],
      [{ align: [] }],
      [{ color: [] }, { background: [] }],
      ['clean']
    ]
  }

  return (
    <ReactQuill
      ref={editorRef}
      value={value}
      onChange={handleChange} // 绑定更新逻辑
      className="bg-white max-h-[300px] overflow-y-auto noSrollBar"
      placeholder={placeholder || '请输入内容'}
      theme="snow"
      modules={modules}
    />
  )
}

export default RichTextEditor
