// 文件相关方法


export function getFileInfo(filename: string) {
  const lastDotIndex = filename.lastIndexOf('.');
  // 获取后缀
  const extension = lastDotIndex !== -1 ? filename.slice(lastDotIndex + 1) : '';
  // 获取没有后缀的文件名
  const name = lastDotIndex !== -1 ? filename.slice(0, lastDotIndex) : filename;
  return {
    extension,
    name,
  };
}