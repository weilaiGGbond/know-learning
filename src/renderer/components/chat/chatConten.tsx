import { List } from "antd"
import { Content } from "antd/es/layout/layout"
import InfiniteScroll from "react-infinite-scroll-component"

const ChatConten = ((chatMessage) => {
    return (
        <Content
            style={{ overflowY: 'auto', padding: '16px', background: '#fff' }}
            className="srollBar overflow-auto"
        >
            {chatMessage}
                  {/* <InfiniteScroll
        dataLength={data.length}
        next={loadMoreData}
        hasMore={data.length < 50}
        loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
        endMessage={<Divider plain>暂时没有更多消息了</Divider>}
        scrollableTarget="scrollableDiv"
        inverse={true}
      >
            <List
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
            />
            </InfiniteScroll> */}
        </Content>
    )
})
export default ChatConten