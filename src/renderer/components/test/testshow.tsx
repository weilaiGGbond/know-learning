"use client"

import React, { useState, useEffect, useRef } from 'react'
import { Layout, Menu, Typography, Card, Radio, Checkbox, Input, Space, Button, message } from 'antd'
import { ClockCircleOutlined } from '@ant-design/icons'

const { Header, Sider, Content } = Layout
const { Title, Paragraph } = Typography
const { TextArea } = Input

interface Question {
  id: number
  type: 'single' | 'multiple' | 'essay'
  content: string
  options?: string[]
}

const mockQuestions: Question[] = [
  { id: 1, type: 'single', content: "1 + 1 = ?", options: ["1", "2", "3", "4"] },
  { id: 2, type: 'single', content: "2 * 3 = ?", options: ["3", "4", "5", "6"] },
  { id: 3, type: 'multiple', content: "以下哪些是质数？", options: ["2", "3", "4", "5"] },
  { id: 4, type: 'multiple', content: "以下哪些是偶数？", options: ["1", "2", "3", "4"] },
  { id: 5, type: 'essay', content: "简述牛顿第二定律。" },
  { id: 6, type: 'essay', content: "解释光合作用的过程。" },
]

export default function ExamPaper() {
  const [answers, setAnswers] = useState<{ [key: number]: string | string[] }>({})
  const [remainingTime, setRemainingTime] = useState(3600) // 1 hour in seconds
  const questionRefs = useRef<{ [key: number]: React.RefObject<HTMLDivElement> }>({})

  useEffect(() => {
    mockQuestions.forEach(question => {
      questionRefs.current[question.id] = React.createRef<HTMLDivElement>()
    })
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timer)
          message.warning('考试时间已结束！')
          return 0
        }
        return prevTime - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
  }

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
    questionRefs.current[questionId]?.current?.scrollIntoView({ behavior: 'smooth' })
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
      single: [],
      multiple: [],
      essay: [],
    }

    mockQuestions.forEach(question => {
      questionsByType[question.type].push(question)
    })

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

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={200} theme="light">
        <Menu mode="inline" style={{ height: '100%', borderRight: 0 }}>
          <Menu.ItemGroup key="single" title="单选题">
            {mockQuestions.filter(q => q.type === 'single').map(q => (
              <Menu.Item key={q.id} onClick={() => scrollToQuestion(q.id)}>
                题目 {q.id}
              </Menu.Item>
            ))}
          </Menu.ItemGroup>
          <Menu.ItemGroup key="multiple" title="多选题">
            {mockQuestions.filter(q => q.type === 'multiple').map(q => (
              <Menu.Item key={q.id} onClick={() => scrollToQuestion(q.id)}>
                题目 {q.id}
              </Menu.Item>
            ))}
          </Menu.ItemGroup>
          <Menu.ItemGroup key="essay" title="简答题">
            {mockQuestions.filter(q => q.type === 'essay').map(q => (
              <Menu.Item key={q.id} onClick={() => scrollToQuestion(q.id)}>
                题目 {q.id}
              </Menu.Item>
            ))}
          </Menu.ItemGroup>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: '0 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Title level={4} style={{ margin: 0 }}>考试进行中</Title>
          <Space>
            <ClockCircleOutlined />
            <span>剩余时间: {formatTime(remainingTime)}</span>
          </Space>
        </Header>
        <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280, overflow: 'auto' }}>
          {renderQuestions()}
          <Button type="primary" style={{ marginTop: 16 }} onClick={handleSubmit}>
            提交答案
          </Button>
        </Content>
      </Layout>
    </Layout>
  )
}