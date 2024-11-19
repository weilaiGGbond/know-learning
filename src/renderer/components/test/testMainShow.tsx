import React, { useState, useEffect } from 'react';
import { Layout, Typography, Button, Radio, Checkbox, Input, Progress } from 'antd';
import { ClockCircleOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import CountdownTimer from '../testCoponent/testMain/time';
import QuestionTypeMenu from '../testCoponent/testMain/typeTitle';
import QuestionContent from '../testCoponent/testMain/question';
import QuestionNumbers from '../testCoponent/testMain/number';
import '@renderer/assets/styles/test/index.scss'
import StudentPaperHook from '@renderer/hook/paper/student';
import { useLocation } from 'react-router-dom';
import PaperLeftNail from '../testCoponent/paper/leftNail';
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
    const { examId, lessonId } = location.state || {}; // 使用默认值以防没有传递状态
    //先获取当前paperId
    const { getPaperId,
        bigList,
        judgeList,
        multiList,
        radioList,
        title,
        allList
    } = StudentPaperHook()
    useEffect(() => {
        getPaperId(examId, lessonId)
    }, [])
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

    const handleNextQuestion = () => {
        if (currentQuestionId < allQuestions) {
            setcurrentQuestionId(currentQuestionId + 1)
        }
    };
    return (
        <Layout>
            <div className="flex p-6 testMainshow">
                {/* <div className="w-1/4 pr-6 border-r">
                    {
                        examData.singleChoice.length != 0 ?
                            <>
                                <QuestionTypeMenu currentType='singleChoice' />
                                < QuestionNumbers
                                    questions={examData.singleChoice}
                                    currentQuestionId={
                                        currentQuestionId
                                    }
                                    onSelect={setcurrentQuestionId}
                                />
                            </> : <></>
                    }
                    {
                        examData.multipleChoice.length != 0 ?
                            <>
                                <QuestionTypeMenu currentType='multipleChoice' />
                                < QuestionNumbers
                                    questions={examData.multipleChoice}
                                    currentQuestionId={
                                        currentQuestionId
                                    }
                                    onSelect={setcurrentQuestionId}
                                />
                            </> : <></>
                    }
                    {
                        examData.essay.length != 0 ?
                            <>
                                <QuestionTypeMenu currentType='essay' />
                                < QuestionNumbers
                                    questions={examData.essay}
                                    currentQuestionId={
                                        currentQuestionId
                                    }
                                    onSelect={setcurrentQuestionId}
                                />
                            </> : <></>
                    }
                </div> */}
                <Sider width={200} style={{ padding: '8px' }} theme="light">
                    <PaperLeftNail examData={allList}
                        bigList={bigList}
                        judgeList={judgeList} multiList={multiList}
                        radioList={radioList}
                        currentQuestionId={currentQuestionId} onSelect={setcurrentQuestionId} id={false}/>
                </Sider>
                <Content className="w-3/4 pl-6">
                    <Title level={2} className="mb-4">{examData.name}</Title>
                    {
                        currentQuestionId === allQuestions ?
                            <Button type='primary' >提交</Button> : <></>
                    }
                    <CountdownTimer duration={examData.duration} />

                    <QuestionContent question={currentQuestion} type={currentType} />
                    <div className="flex justify-between mt-6">
                        <Button
                            onClick={handlePrevQuestion}
                            disabled={currentQuestionId - 1 === 0}
                            icon={<LeftOutlined />}
                        >
                            上一题
                        </Button>
                        <Button
                            onClick={handleNextQuestion}
                            disabled={currentQuestionId === allQuestions}
                            icon={<RightOutlined />}
                        >
                            下一题
                        </Button>
                    </div>
                </Content>
            </div>
        </Layout>
    );
}