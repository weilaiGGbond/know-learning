import { EditOutlined, EllipsisOutlined } from '@ant-design/icons';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import ReturnNailbar from '@renderer/components/layout/returnNail';
import QuestionListMain from '@renderer/components/testCoponent/teacher/questionBank/main';
import { Button, Dropdown } from 'antd';
const QuestionBank = () => {
  return (
    <div
      style={{
        background: '#F5F7FA',
      }}
    >
      <PageContainer
        token={{
          paddingBlockPageContainerContent: 24,
          paddingInlinePageContainerContent: 60,
        }}
        header={{
          title: '当前题库',
          ghost: true,
          breadcrumb:
            <ReturnNailbar children={
              <div>
                <Button icon={<EditOutlined />} type='link'>新建题库</Button>
              </div>
            } />,
          extra: [
            <Button key="3" type="primary">
              添加题目
            </Button>,
            <Dropdown
              key="dropdown"
              trigger={['click']}
              menu={{
                items: [
                  {
                    label: '下拉菜单',
                    key: '1',
                  },
                  {
                    label: '下拉菜单2',
                    key: '2',
                  },
                  {
                    label: '下拉菜单3',
                    key: '3',
                  },
                ],
              }}
            >
              <Button key="4" style={{ padding: '0 8px' }}>
                <EllipsisOutlined />
              </Button>
            </Dropdown>,
          ],
        }}
      >
        <QuestionListMain />

      </PageContainer>
    </div>
  )
}
export default QuestionBank