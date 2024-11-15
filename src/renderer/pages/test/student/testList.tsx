import { Avatar, Breadcrumb, Button, Divider, Flex, Input, List, Modal, Skeleton } from "antd"
import { getLessonChat, lessonMessageMethods } from "@renderer/api/student/chat";
import { EditOutlined, SearchOutlined } from "@ant-design/icons";
import chatMethods from "@renderer/hook/chat/chat";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const StudentTestList = () => {
    const { getLessonMessage, lessonMessage } = chatMethods();
    useEffect(() => {

        getLessonMessage()
    }, [])
    const navigate = useNavigate()
    const data = Array.from({ length: 23 }).map((_, i) => ({
        href: 'https://ant.design',
        title: "第四章测试",
        avatar: `https://api.dicebear.com/7.x/miniavs/svg?seed=${i}`,
        description:
            '时间：2048-10-18 - 2024-10-18',
        content:
            '未完成',
    }))
    const gotoNewTest=()=>{
        navigate(`/addNewTest`)
    }
    return (
        <div className="flex flex-col flex-grow h-full">
            <div className="flex w-full justify-between py-8 h-11 items-center border-b border-gray-300">
                <p className="CourseName pl-6 text-base font-bold text-[#131B26] sm:hidden xs:hidden lg:block">
                    {lessonMessage?.lessonName}
                </p>
                <div className="flex items-center m-6">
                    <Button icon={<EditOutlined />} onClick={gotoNewTest}>
                        发布考试
                    </Button>
                    <Input
                        style={{ borderRadius: 4, marginInlineEnd: 12 }}
                        prefix={<SearchOutlined style={{ color: 'rgba(0, 0, 0, 0.15)' }} />}
                        placeholder="搜索考试"
                    />

                    <Button type="primary" className="bg-[#1677FF]">
                        确定
                    </Button>

                </div>
            </div>
            <div className="overflow-y-auto srollBar px-5 pb-5 flex-1" id="scrollableDiv">
                <List
                    itemLayout="vertical"
                    size="large"
                    pagination={{
                        onChange: (page) => {
                            console.log(page);
                        },
                        pageSize: 3,
                    }}
                    dataSource={data}

                    renderItem={(item) => (
                        <List.Item
                            key={item.title}
                            onClick={() => {
                                navigate(`/studenttest`)

                            }
                            }

                            extra={
                                <img
                                    width={100}
                                    alt="logo"
                                    src={lessonMessage?.coverUrl}
                                />
                            }
                        >
                            <List.Item.Meta
                                title={item.title}
                                description={item.description}
                            />
                            {item.content}
                        </List.Item>
                    )}
                />
            </div>
        </div>
    )
}
export default StudentTestList