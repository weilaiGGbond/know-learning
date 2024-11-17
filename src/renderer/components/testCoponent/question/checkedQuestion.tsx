import React, { useEffect, useState } from 'react'
import { Card, Radio, Space, Typography, Checkbox } from 'antd'

const { Title, Paragraph, Text } = Typography
import CommmomLevel from './common'
const { levelMapping, typeMapping } = CommmomLevel
interface Answer {
    ansId: number
    questionId: number
    isRight: number
    ansContent: string
}

interface Question {
    questionId: number
    questionContent: string
    questionSubject: string
    questionType: number // 0: single choice, 1: multiple choice, 2: true/false
    questionLevel: number
    createTime: number
    ansList: Answer[]
}

export default function QuestionComponent({ question, teacher = true, selectedAnswers = [] }) {
    const [selectedAnswer, setSelectedAnswer] = useState<number[]>(selectedAnswers)
    useEffect(() => {
        if (teacher) {
            const teacherSelectedAnswers = question.ansList
                .filter(answer => answer.isRight === 1)
                .map(answer => answer.ansId);
            setSelectedAnswer(teacherSelectedAnswers);
        }
    }, [question, teacher]);

    const handleSelectAnswer = (ansId: number) => {
        if (question.questionType === 0) {
            setSelectedAnswer([ansId]);
        } else if (question.questionType === 1) {
            setSelectedAnswer(prev => {
                if (prev.includes(ansId)) {
                    return prev.filter(id => id !== ansId);
                } else {
                    return [...prev, ansId];
                }
            });
        }
    }

    return (
        <div style={{ maxWidth: '800px', background: 'white', margin: '10px auto', borderRadius: '6px', padding: '20px' }}>
            <Title level={3}>问题 {typeMapping[question.questionType]}</Title>
            <Paragraph strong>{question.questionContent}</Paragraph>
            {
                teacher !== true && selectedAnswer.length === 0 ?
                    <Text style={{ color: '#fd384c' }}>题目还未作答</Text>
                    : null
            }
            <Space direction="vertical" style={{ width: '100%' }}>
                {question.ansList.map((answer) => {
                    const isChecked = selectedAnswer.includes(answer.ansId);
                    return question.questionType === 0 ? (
                        <Card
                            key={answer.ansId}
                            hoverable
                            style={{
                                width: '100%',
                                borderColor: isChecked ? '#1890ff' : undefined,
                            }}
                        >
                            <Radio
                                value={answer.ansId}
                                checked={isChecked}
                                onChange={() => handleSelectAnswer(answer.ansId)}
                            >
                                {answer.ansContent}
                            </Radio>
                        </Card>
                    ) : (
                        <Card
                            key={answer.ansId}
                            hoverable
                            style={{
                                width: '100%',
                                borderColor: isChecked ? '#1890ff' : undefined,
                            }}
                        >
                            <Checkbox
                                checked={isChecked}
                                onChange={() => handleSelectAnswer(answer.ansId)}
                            >
                                {answer.ansContent}
                            </Checkbox>
                        </Card>
                    );
                })}
            </Space>
            {
                teacher === true ? (
                    <div style={{ marginTop: '20px' }}>
                        <Text type="secondary">科目: {question.questionSubject}</Text>
                        <br />
                        <Text type="secondary">难度: {levelMapping[question.questionLevel]}</Text>
                        <br />
                        <Text type="secondary">
                            创建时间: {new Date(question.createTime).toLocaleString()}
                        </Text>
                    </div>
                ) : null
            }
        </div>
    )
}
