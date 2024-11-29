import { Button, Input, List, Typography } from "antd"
import { EditOutlined } from "@ant-design/icons";
import chatMethods from "@renderer/hook/chat/chat";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PapperListHook from "@renderer/hook/paper/list";
import Utils from "@renderer/utils/util"
import moment from "moment";

const StudentTestList = () => {
    const { timeAgo, turnDate } = Utils
    const { Text } = Typography;
    const { Search } = Input;
    const { getLessonMessage, lessonMessage } = chatMethods();
    const { page, total, examName, setExamName, paperList, getPageList, setPage } = PapperListHook()
    useEffect(() => {
        getLessonMessage()
        getPageList()

    }, [])
    useEffect(() => {
        getPageList()
    }, [page, examName])
    const navigate = useNavigate()

    const gotoNewTest = () => {
        navigate(`/questionBank`)
    }
    const onSearch = (value) => {
        setExamName(value)
    }
    const getStatus = (startTime, endTime) => {
        const now = moment();
        if (now.isBefore(startTime)) {
            return (
                <>
                    <Text type="success">考试未开始</Text>
                    <Text type="secondary"> 考试时间：{turnDate(startTime, endTime)}</Text>
                </>
            );
        } else if (now.isAfter(endTime)) {
            return (
                <>
                    <Text type="danger">考试已结束</Text>
                    <Text type="secondary"> 考试时间：{turnDate(startTime, endTime)}</Text>
                </>
            )
        } else {
            return (
                <>
                    <>
                        <Text type="warning">考试进行中</Text>
                        <Text type="secondary"> 考试时间：{turnDate(startTime, endTime)}</Text>
                    </>
                </>
            )
        }
    };
    const getStatusNow = (startTime, endTime) => {
        const now = moment();
        if (now.isBefore(startTime)) {
            return 0
        } else if (now.isAfter(endTime)) {
            return 2
        } else {
            return 1
        }
    };
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
                    <Search placeholder="搜索考试" onSearch={onSearch} style={{ width: 200 }} />
                </div>
            </div>
            <div className="overflow-y-auto srollBar px-5 pb-5 flex-1" id="scrollableDiv">
                <List
                    itemLayout="vertical"
                    size="large"
                    pagination={{
                        onChange: (page) => {
                            setPage(page)
                        },
                        pageSize: 10,
                        total: total
                    }}
                    dataSource={paperList}

                    renderItem={(item) => (
                        <List.Item
                            key={item.examId}
                            onClick={() => {
                                navigate('/studenttest', { state: { exam: item, status: getStatusNow(item.startTime, item.endTime), name: lessonMessage,duration:item.keepTime } });
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
                                title={item.examName}
                                description={`创建时间 ${timeAgo(item.createTime)}`}
                            />
                            {
                                getStatus(item.startTime, item.endTime)
                            }

                        </List.Item>
                    )}
                />
            </div>
        </div>
    )
}
export default StudentTestList