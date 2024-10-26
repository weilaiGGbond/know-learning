import {
  FaFilePdf,
  FaFileWord,
  FaFileExcel,
  FaFilePowerpoint,
  FaFileImage,
  FaFileAlt,
  FaFile
} from 'react-icons/fa'

function getIconByExtension(extension: string) {
  switch (extension) {
    case 'pdf':
      return <FaFilePdf color="red" />
    case 'doc':
    case 'docx':
      return <FaFileWord color="blue" />
    case 'xls':
    case 'xlsx':
      return <FaFileExcel color="green" />
    case 'ppt':
    case 'pptx':
      return <FaFilePowerpoint color="orange" />
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif':
      return <FaFileImage color="purple" />
    case 'txt':
      return <FaFileAlt color="gray" />
    default:
      return <FaFile color="black" />
  }
}

function Icon({ fileUrl }) {
  const fileExtension = fileUrl.split('.').pop().toLowerCase()
  const IconComponent = getIconByExtension(fileExtension)

  return <div style={{ fontSize: '24px' }}>{IconComponent}</div>
}

export default Icon
