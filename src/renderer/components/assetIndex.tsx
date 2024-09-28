import { Card, Flex } from 'antd'
import example from '@renderer/assets/example.webp'
import '@renderer/assets/styles/common.scss'

function AssetIndex(): JSX.Element {
  return (
    <div>
      <Card
        hoverable
        className="AssetIndex"
        style={{ width: 200 }}
        cover={
          <div className="w-100% h-24 overflow-hidden">
            <img alt="example" className="w-100%" src={example} />
          </div>
        }
      >
        <div>
          <Flex align="center" justify="space-between">
            <div>
              <p className="font-bold">标题</p>
              <p className="mt-1.5 text-xs text-slate-400">创建时间：2024-4-20</p>
            </div>
            <div className="w-7 h-7">
              <img src={example} alt="创建用户头像" className="w-100% h-100% rounded-[50%]" />
            </div>
          </Flex>
        </div>
      </Card>
    </div>
  )
}

export default AssetIndex
