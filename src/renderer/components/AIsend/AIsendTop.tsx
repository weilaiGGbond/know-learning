import { Avatar, Space } from "antd"
import { Header } from "antd/es/layout/layout"
import AIsendPhoto from '@renderer/assets/img/image.png'
const AIsendTop = () => {
    return (
        <div>
            <Header
                style={{ background: '#fff', padding: '0 16px', borderBottom: '1px solid #f0f0f0' }}
                className="sticky top-0 z-10"
            >
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        height: '100%'
                    }}
                >
                    <Space>

                        <Avatar src={AIsendPhoto}>

                        </Avatar>
                        <span>AI</span>
                    </Space>
                </div>
            </Header>
        </div>
    )
}
export default AIsendTop