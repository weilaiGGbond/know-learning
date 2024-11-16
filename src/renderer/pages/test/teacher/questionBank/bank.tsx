import { EditOutlined, EllipsisOutlined } from '@ant-design/icons';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import ReturnNailbar from '@renderer/components/layout/returnNail';
import QuestionListMain from '@renderer/components/testCoponent/teacher/questionBank/main';
import QuestionListHook from '@renderer/hook/questionbank/questionList';
import { Button, Dropdown } from 'antd';
import { useEffect, useState } from 'react';

const QuestionBank = () => {
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
      </PageContainer>
    </div>
  );
};

export default QuestionBank;
