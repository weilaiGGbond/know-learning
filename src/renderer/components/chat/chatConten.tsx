import { List } from "antd"
import { Content } from "antd/es/layout/layout"

const ChatConten = (() => {
    return (
        <Content
            style={{ overflowY: 'auto', padding: '16px', background: '#fff' }}
            className="srollBar overflow-auto"
        >
            {/* <List
                dataSource={messages}
                renderItem={(message) => (
                    <div>
                        <List.Item
                            style={{
                                justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start'
                            }}
                        >
                            <div
                                style={{
                                    maxWidth: '70%',
                                    padding: '8px 12px',
                                    borderRadius: '8px',
                                    background: message.sender === 'user' ? '#d6eae9' : '#f0f2f5',
                                    color: message.sender === 'user' ? '#fff' : 'rgba(0, 0, 0, 0.85)'
                                }}
                            >
                                <Text>{message.text}</Text>
                            </div>
                        </List.Item>
                        <div style={{ textAlign: 'center' }}>
                            <Text type="secondary" style={{ fontSize: '12px', opacity: 0.7 }}>
                                {message.timestamp}
                            </Text>
                        </div>
                    </div>
                )}
            /> */}
        </Content>
    )
})