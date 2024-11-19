import { useEffect, useRef } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
interface RichTextEditorProps {
  value: string
  onChange: (value: any) => void
  placeholder?: string
  getJSON: any
  isJson: boolean
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  isJson,
  getJSON,
  value,
  onChange,
  placeholder
}) => {
  const editorRef = useRef<ReactQuill>(null)
  const handleJSON = () => {
    if (editorRef.current) {
      const quill = editorRef.current.getEditor()
      const delta = quill.getContents()
      console.log(JSON.stringify(delta, null, 2))
      return JSON.stringify(delta, null, 2)
    } else {
      return {}
    }
  }
  useEffect(() => {
    const json = handleJSON()
    getJSON(json)
  }, [isJson])

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
      onChange={onChange}
      className="bg-white max-h-[300px] overflow-y-auto noSrollBar"
      placeholder={placeholder || '请输入内容'}
      theme="snow"
      modules={modules}
    />
  )
}

export default RichTextEditor
