//老师预览页面
import React, { useState, useEffect, useRef } from 'react'
import { Layout, Menu, Typography, Card, Radio, Checkbox, Input, Space, Button, message } from 'antd'
import { ClockCircleOutlined } from '@ant-design/icons'
import PaperLeftNail from './leftNail'

const { Header, Sider, Content } = Layout
const { Title, Paragraph } = Typography
const { TextArea } = Input

interface Question {
  id: number
  type: 'single' | 'multiple' | 'essay'
  content: string
  options?: string[],
  sorce: number,
}

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

export default function ExamPaperPre() {
  const [answers, setAnswers] = useState<{ [key: number]: string | string[] }>({})
  const questionRefs = useRef<{ [key: number]: React.RefObject<HTMLDivElement> }>({});
  const mockQuestions = [
    ...examData.singleChoice,
    ...examData.multipleChoice,
    ...examData.essay,
  ];
  mockQuestions.forEach(question => {
    questionRefs.current[question.id] = React.createRef<HTMLDivElement>();
  });

  const handleAnswerChange = (questionId: number, answer: string | string[]) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answer,
    }))
  }

  const handleSubmit = () => {
    console.log('提交的答案:', answers)
    message.success('答案已提交！')
    // 这里您可以添加向服务器提交答案的逻辑
  }

  const scrollToQuestion = (questionId: number) => {
    console.log(`滚动到问题 ${questionId}`);

    questionRefs.current[questionId]?.current?.scrollIntoView({ behavior: 'smooth' })
    console.log(questionRefs);

  }

  const renderQuestionContent = (question: Question) => {
    switch (question.type) {
      case 'single':
        return (
          <Radio.Group
            onChange={(e) => handleAnswerChange(question.id, e.target.value)}
            value={answers[question.id] as string}
          >
            <Space direction="vertical">
              {question.options?.map((option, index) => (
                <Radio key={index} value={option}>
                  {option}
                </Radio>
              ))}
            </Space>
          </Radio.Group>
        )
      case 'multiple':
        return (
          <Space direction="vertical">
            {question.options?.map((option, index) => (
              <Checkbox
                key={index}
                onChange={(e) => {
                  const currentAnswers = answers[question.id] as string[] || []
                  if (e.target.checked) {
                    handleAnswerChange(question.id, [...currentAnswers, option])
                  } else {
                    handleAnswerChange(question.id, currentAnswers.filter(a => a !== option))
                  }
                }}
                checked={(answers[question.id] as string[] || []).includes(option)}
              >
                {option}
              </Checkbox>
            ))}
          </Space>
        )
      case 'essay':
        return (
          <TextArea
            rows={4}
            onChange={(e) => handleAnswerChange(question.id, e.target.value)}
            value={answers[question.id] as string}
          />
        )
    }
  }

  const renderQuestions = () => {
    const questionsByType: { [key: string]: Question[] } = {
      single:examData.singleChoice,
      multiple:examData.multipleChoice,
      essay:examData.essay,
    }

    return Object.entries(questionsByType).map(([type, questions]) => (
      <div key={type}>
        <Title level={2} style={{ marginTop: '24px' }}>
          {type === 'single' && '单选题'}
          {type === 'multiple' && '多选题'}
          {type === 'essay' && '简答题'}
        </Title>
        {questions.map(question => (
          <Card
            key={question.id}
            title={`题目 ${question.id}`}
            style={{ marginBottom: '16px' }}
            ref={questionRefs.current[question.id]}
          >
            <Paragraph>{question.content}</Paragraph>
            {renderQuestionContent(question)}
          </Card>
        ))}
      </div>
    ))
  }
  const [currentQuestionId, setcurrentQuestionId] = useState(1)
  return (
    <Layout style={{ minHeight: '80vh' }}>
      <Sider width={200} style={{ padding: '8px' }} theme="light">
        <PaperLeftNail examData={examData} currentQuestionId={currentQuestionId} onSelect={scrollToQuestion} />
      </Sider>
      <Layout>

        <Content style={{ margin: '', padding: 24, background: '#fff', minHeight: 280, overflow: 'auto' }}>
          {renderQuestions()}
          <Button type="primary" style={{ marginTop: 16 }} onClick={handleSubmit}>
            完成试题创建
          </Button>
        </Content>
      </Layout>
    </Layout>
  )
}
