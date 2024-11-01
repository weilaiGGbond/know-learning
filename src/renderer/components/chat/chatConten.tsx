import { Divider, List, Skeleton, Typography } from "antd";
import { Content } from "antd/es/layout/layout";
import InfiniteScroll from "react-infinite-scroll-component";
import Util from '@renderer/utils/util';
import { useSelector } from "react-redux";
import { useCallback } from "react";

interface messageChatmain {
    messageId: number,
    messageText: string,
    name: string,
    createTime: number,
    username: string,
}

const ChatConten = ((chat) => {
    const username = useSelector((state) => state.personReducer.username);
    const { Text } = Typography;
    const { chatMessage, loadMore, page,handleScroll,getChatMessage } = chat; // 确保 loadMore 函数传入

  

    return (
        <Content
            style={{ overflowY: 'auto', padding: '16px', background: '#fff' }}
            className="srollBar overflow-auto"
        >
            <div
                id="scrollableDiv"
                style={{
                    height: 200,
                    overflow: 'auto',
                    padding: '0 16px',
                    display: 'flex',
                    flexDirection: 'column-reverse' // 使列表从底部开始
                }}
                onScroll={getChatMessage} // 添加 onScroll 事件
            >
                <List
                    dataSource={chatMessage}
                    renderItem={(message: messageChatmain) => (
                        <div>
                            <List.Item
                                style={{
                                    justifyContent: message.username === username ? 'flex-end' : 'flex-start'
                                }}
                            >
                                <div
                                    style={{
                                        maxWidth: '70%',
                                        padding: '8px 12px',
                                        borderRadius: '8px',
                                        background: message.username === username ? '#d6eae9' : '#f0f2f5',
                                        color: message.username === username ? '#fff' : 'rgba(0, 0, 0, 0.85)'
                                    }}
                                >
                                    <Text>{message.messageText}</Text>
                                </div>
                            </List.Item>
                            <div style={{ textAlign: 'center' }}>
                                <Text type="secondary" style={{ fontSize: '12px', opacity: 0.7 }}>
                                    {Util.timeAgo(message.createTime)}
                                </Text>
                            </div>
                        </div>
                    )}
                />
            </div>
        </Content>
    );
});

export default ChatConten;
