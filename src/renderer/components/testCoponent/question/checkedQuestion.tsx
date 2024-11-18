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

export default function QuestionComponent({ question, questionRefs , teacher = true, selectedAnswers = [] }) {
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
    console.log(question, '888');
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
                            ref={questionRefs.current[question.id]}
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

        </div>
    )
}
