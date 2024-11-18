import { EditOutlined, EllipsisOutlined } from '@ant-design/icons';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import ReturnNailbar from '@renderer/components/layout/returnNail';
import SingleChoiceQuestion from '@renderer/components/testCoponent/question/checkedQuestion';
import QuestionListMain from '@renderer/components/testCoponent/teacher/questionBank/main';
import QuestionListHook from '@renderer/hook/questionbank/questionList';
import { Button, Dropdown } from 'antd';
import { useEffect, useState } from 'react';

const QuestionBank = () => {
  const questionData = {
    questionId: 1,
    questionContent: "你猜谁最厉害",
    questionSubject: "JAVA",
    questionType: 0,
    questionLevel: 1,
    createTime: 1731672691000,
    ansList: [
      {
        ansId: 1,
        questionId: 1,
        isRight: 1,
        ansContent: "A：阳阳酱"
      },
      {
        ansId: 2,
        questionId: 1,
        isRight: 1,
        ansContent: "B：乐乐桑"
      },
      {
        ansId: 3,
        questionId: 1,
        isRight: 0,
        ansContent: "C：阳阳酱"
      },
      {
        ansId: 4,
        questionId: 1,
        isRight: 0,
        ansContent: "D：阳阳酱"
      }
    ]
  };
  const levelMapping = {
    0: '简单',
    1: '中等',
    2: '困难',
  };
  <SingleChoiceQuestion question={questionData} questionRefs={undefined} />
  return (
    <div style={{ background: '#F5F7FA' }}>
      <PageContainer
        token={{
          paddingBlockPageContainerContent: 24,
          paddingInlinePageContainerContent: 60,
        }}
        header={{
          title: '总题库',
          ghost: true,
          breadcrumb: (
            <ReturnNailbar>
              <div>
                <Button icon={<EditOutlined />} type='link'>新建题库</Button>
              </div>
            </ReturnNailbar>
          ),
          extra: [
            <Button key="3" type="primary">
              添加题目
            </Button>,

          ],
        }}
      >
        <QuestionListMain />
        {/* <SingleChoiceQuestion question={questionData} /> */}
      </PageContainer>
    </div>
  );
};

export default QuestionBank;
