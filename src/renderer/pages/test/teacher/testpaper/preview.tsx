import { useLocation } from "react-router-dom";
import { EditOutlined, EllipsisOutlined } from '@ant-design/icons';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import ReturnNailbar from '@renderer/components/layout/returnNail';
import QuestionListMain from '@renderer/components/testCoponent/teacher/questionBank/main';
import { Button, Dropdown } from 'antd';
import ExamPaperPre from "@renderer/components/testCoponent/paper/prepaper";
const PreViewPaper = () => {
    return (
        <div>
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
                        title: '试卷预览',
                        ghost: true,
                        breadcrumb:
                            <ReturnNailbar children={
                                null
                            } />,
                    }}
                >
                    <ExamPaperPre />
                </PageContainer>
            </div>
        </div>
    );
};

export default PreViewPaper;
