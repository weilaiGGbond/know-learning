import { Button, Input, List, message, Typography } from "antd"
import { EditOutlined } from "@ant-design/icons";
import chatMethods from "@renderer/hook/chat/chat";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PapperListHook from "@renderer/hook/paper/list";
import Utils from "@renderer/utils/util"
import moment from "moment";
import { useSelector } from "react-redux";

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
    const getStatus = (startTime, endTime, hasFinshed) => {
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
        } else if (hasFinshed == 1) {
            return (
                <>
                    <>
                        <Text type="secondary">已完成</Text>
                        <Text type="secondary"> 考试时间：{turnDate(startTime, endTime)}</Text>
                    </>
                </>
            )
        }
        else {
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
    const getStatusNow = (startTime, endTime, hasFinshed) => {
        const now = moment();
        if (now.isBefore(startTime)) {
            //未开始
            return 0
        } else if (now.isAfter(endTime)) {
            //逾期
            return 2
        }
        else if (hasFinshed == 1) {
            return -1
        }
        else {
            //进行中
            return 1
        }
    };
    const setTime = useSelector((state: any) => state.PaperSliceReducer.setTime);
    const paperId = useSelector((state: any) => state.PaperSliceReducer.paperId);
    return (
        <div className="flex flex-col flex-grow h-full">
            <div className="flex w-full justify-between py-8 h-11 items-center border-b border-gray-300">
                <p className="CourseName pl-6 text-base font-bold text-[#131B26] sm:hidden xs:hidden lg:block">
                    {lessonMessage?.lessonName}
                </p>
                <div className="flex items-center m-6">
                    <Button icon={<EditOutlined />} onClick={gotoNewTest}>
                        发布考试
                        {paperId}
                    </Button>
                    <Search placeholder="搜索考试" onSearch={onSearch} style={{ width: 200 }} />
                </div>
            </div>
            <div>
                {setTime && setTime != 0 && paperId != 0 ?
                    <div className="flex items-center justify-between px-5 py-3">
                        <Text type="secondary" onClick={

                            () => {
                                navigate('/testMain', { state: { examId: paperId, lessonId: 1 } })
                            }
                        }>
                            您有考试未完成 请及时处理
                        </Text>
                    </div> : <></>
                }
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
                                if (setTime && setTime != 0 && paperId != 0) {
                                    message.warning("您有考试未完成 请及时处理")
                                } else {
                                    navigate('/studenttest', { state: { exam: item, status: getStatusNow(item.startTime, item.endTime, item.hasFinshed), name: lessonMessage } });
                                }
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
                                getStatus(item.startTime, item.endTime, item.hasFinshed)
                            }

                        </List.Item>
                    )}
                />
            </div>
        </div>
    )
}
export default StudentTestList