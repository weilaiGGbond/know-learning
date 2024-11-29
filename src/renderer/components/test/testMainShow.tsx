import React, { useState, useEffect } from 'react';
import { Layout, Typography, Button, Radio, Checkbox, Input, Progress, Modal, message } from 'antd';
import { ClockCircleOutlined, EditOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import CountdownTimer from '../testCoponent/testMain/time';
import QuestionTypeMenu from '../testCoponent/testMain/typeTitle';
import QuestionContent from '../testCoponent/testMain/question';
import QuestionNumbers from '../testCoponent/testMain/number';
import '@renderer/assets/styles/test/index.scss'
import StudentPaperHook from '@renderer/hook/paper/student';
import { useLocation, useNavigate } from 'react-router-dom';
import PaperLeftNail from '../testCoponent/paper/leftNail';
import QuestionStudentAnswer from '../testCoponent/testMain/questionAnswer';
import { sumbitPaper } from '@renderer/api/student/paper';
import { useDispatch, useSelector } from 'react-redux';
import { setPaperIdnow } from '@renderer/store/reducers/paper';
const { Content, Sider } = Layout;
const { Title, Text } = Typography;
const { TextArea } = Input;
type Question = {
    id: number;
    question: string;
    options?: string[]; // 可选属性
    score: number;
    type: string;
};
// 模拟题目数据
const examData = {
    name: "2023年度综合能力测试",
    duration: 7200, // 2小时，以秒为单位
    singleChoice: [
        { id: 1, question: "单选题1的内容", options: ["A", "B", "C", "D"], score: 5, type: 'singleChoice' },
        { id: 2, question: "单选题2的内容", options: ["A", "B", "C", "D"], score: 5, type: 'singleChoice' },

    ],
    multipleChoice: [
        { id: 3, question: "多选题1的内容", options: ["A", "B", "C", "D"], score: 10, type: 'multipleChoice' },
        { id: 4, question: "多选题2的内容", options: ["A", "B", "C", "D"], score: 10, type: 'multipleChoice' },
    ],
    essay: [
        { id: 5, question: "简答题1的内容", score: 20, type: 'essay' },
        { id: 6, question: "简答题2的内容", score: 20, type: 'essay' },
        { id: 7, question: "简答题2的内容", score: 20, type: 'essay' },
    ],
};
const allQuestions = 7
// 主组件
export default function Component() {
    const location = useLocation();
    const { confirm } = Modal
    const { examId, lessonId, duration } = location.state || {};
    const navigate = useNavigate()
    //先获取当前paperId
    const { getPaperId,
        bigList,
        judgeList,
        multiList,
        radioList,
        title,
        paperId,
        allList,
        sumbitAnswer,
        changeStatus,
        answerAll
    } = StudentPaperHook()
    useEffect(() => {
        getPaperId(examId, lessonId)
    }, [])
    const dispatch = useDispatch();
    const [currentQuestionIdget, setcurrentQuestionIdget] = useState<undefined | number>()
    const [nowpaperQuid, setnowpaperQuid] = useState<number>()
    const [currentType, setCurrentType] = useState('singleChoice');
    const [currentQuestionId, setcurrentQuestionId] = useState(1)
    const [currentQuestion, setCurrentQuestion] = useState<Question | undefined>(examData.singleChoice[0]);
    const getCurrentQuestion = (id: number): Question | undefined => {
        const allQuestions = [
            ...examData.singleChoice,
            ...examData.multipleChoice,
            ...examData.essay,
        ];

        return allQuestions.find(question => question.id === id);
    };
    //通过index去获取当前id
    useEffect(() => {
        allList.find((item) => {
            console.log(item, '14444');

            if (item.index === currentQuestionId) {
                setcurrentQuestionIdget(item.questionId)
                setnowpaperQuid(item.paperQuId)

            }
        })
    }, [currentQuestionId, allList])
    useEffect(() => {
        const nowQuestion = getCurrentQuestion(currentQuestionId);
        if (nowQuestion) {
            setCurrentQuestion(nowQuestion)
            setCurrentType(nowQuestion.type)
        } else {
            setCurrentQuestion(examData.singleChoice[0])
        }
    }, [currentQuestionId]);

    const handlePrevQuestion = () => {
        if (currentQuestionId > 1) {
            setcurrentQuestionId(currentQuestionId - 1)
        }
    };

    const handleNextQuestion = async () => {
        const flag = sumbitAnswer(paperId, nowpaperQuid)
        if (await flag) {
            if (currentQuestionId < allList.length) {
                setcurrentQuestionId(currentQuestionId + 1)
            }
            //并且把当前数据变成
            changeStatus(currentQuestionIdget)
        }
    };

    //answer变化后 更新数据
    const submit = async () => {
        try {
            const flag = await sumbitAnswer(paperId, nowpaperQuid);
            if (flag) {
                // 变数据
                changeStatus(currentQuestionIdget);
                console.log(answerAll());

                // 跳转确定
                if (!answerAll()) {
                    // 没写完
                    confirm({
                        title: '提示',
                        content: '您还有题目没作答?',
                        async onOk() {
                            const data = await sumbitPaper(paperId) as any
                            if (data.code == 20000) {
                                message.success('提交成功,一秒后返回主页面');
                                navigate(-2)
                                dispatch(setPaperIdnow(0));
                            }
                        },
                        onCancel() { }
                    });
                } else {
                    // 写完了
                    confirm({
                        title: '提示',
                        content: '确定要提交吗?',
                        async onOk() {
                            const data = await sumbitPaper(paperId) as any
                            if (data.code == 20000) {
                                message.success('提交成功,一秒后返回主页面');
                                navigate(-2)
                                dispatch(setPaperIdnow(0));
                            }
                        },
                        onCancel() { }
                    });
                }
            }
        } catch (error) {
            console.error('提交出错:', error);
            message.error('提交失败，请重试');
        }
    };
    const handleSelectType = async () => {
        const data = await sumbitPaper(paperId) as any
        if (data.code == 20000) {
            message.success('提交成功,一秒后返回主页面');
            dispatch(setPaperIdnow(0));
            navigate(-2)
        }
    };
    const setTime = useSelector((state: any) => state.PaperSliceReducer.setTime);
    //判断数据是不是
    return (
        <Layout>
            <div className="flex p-6 testMainshow">
                <Sider width={200} style={{ padding: '8px' }} theme="light">
                    {currentQuestionId} {currentQuestionIdget}
                    <PaperLeftNail examData={allList}
                        bigList={bigList}
                        judgeList={judgeList} multiList={multiList}
                        radioList={radioList}
                        currentQuestionId={currentQuestionId} onSelect={setcurrentQuestionId} id={false} />
                </Sider>
                <Content className="w-3/4 pl-6">
                    <Title level={2} className="mb-4">{title}</Title>
                    {
                        setTime
                    }
                    <CountdownTimer summbit={handleSelectType} time={setTime} />

                    <QuestionStudentAnswer currentID={currentQuestionId}
                        id={currentQuestionIdget} paperId={paperId} />

                    <div className="flex justify-between mt-6">
                        <Button
                            onClick={handlePrevQuestion}
                            disabled={currentQuestionId - 1 === 0}
                            icon={<LeftOutlined />}
                        >
                            上一题
                        </Button>
                        {currentQuestionId !== allList.length ?
                            <Button
                                onClick={handleNextQuestion}
                                icon={<RightOutlined />}
                            >
                                下一题
                            </Button> : <></>

                        }

                        {
                            currentQuestionId === allList.length ?
                                <Button icon={<EditOutlined />} onClick={submit} >提交</Button> : <></>
                        }
                    </div>
                </Content>
            </div>
        </Layout>
    );
}