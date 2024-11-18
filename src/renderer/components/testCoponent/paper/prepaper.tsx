//老师预览页面
import React, { useState, useEffect, useRef } from 'react'
import { Layout, Menu, Typography, Card, Radio, Checkbox, Input, Space, Button, message, Modal } from 'antd'
import { ClockCircleOutlined } from '@ant-design/icons'
import PaperLeftNail from './leftNail'
import PreviewHook from '@renderer/hook/paper/preview'
import QuestionComponent from '../question/checkedQuestion'
import { useNavigate } from 'react-router-dom'

const { Sider, Content } = Layout
export default function ExamPaperPre() {
  const { confirm } = Modal;
  const navigate = useNavigate()
  const { getPreviewList, bigList, judgeList, multiList, radioList, allList } = PreviewHook()
  const questionRefs = useRef<{ [key: number]: React.RefObject<HTMLDivElement> }>({});
  allList.forEach(question => {
    questionRefs.current[question.id] = React.createRef<HTMLDivElement>();
  });
  useEffect(() => {
    getPreviewList()
  }, [])
  const scrollToQuestion = (questionId: number) => {
    questionRefs.current[questionId]?.current?.scrollIntoView({ behavior: 'smooth' })

  }
  const gotoAddNewWord = () => {
    confirm({
      title: '试题创建',
      content: '确定不再添加试题？',
      onOk() {
        navigate('/addNewTest')

      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }
  const [currentQuestionId, setcurrentQuestionId] = useState(1)
  return (
    <Layout style={{ minHeight: '80vh' }}>
      <Sider width={200} style={{ padding: '8px' }} theme="light">
        <PaperLeftNail examData={allList}
          bigList={bigList}
          judgeList={judgeList} multiList={multiList}
          radioList={radioList}
          currentQuestionId={currentQuestionId} onSelect={scrollToQuestion} />
      </Sider>
      <Layout>

        <Content style={{ margin: '', padding: 24, background: '#fff', minHeight: 280, overflow: 'auto' }}>
          {
            allList.map((item) => {
              return <QuestionComponent question={item} questionRefs={questionRefs} teacher={true} />
            })
          }
          <Button type="primary" style={{ marginTop: 16 }} onClick={gotoAddNewWord}>
            完成试题创建
          </Button>
        </Content>
      </Layout>
    </Layout>
  )
}
