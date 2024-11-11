import { CheckCircleOutlined, ClockCircleOutlined, LockOutlined } from "@ant-design/icons"
import { Button, Card, Result, Space, Statistic, Typography } from "antd"
import { useNavigate } from "react-router-dom"
const { Title, Paragraph } = Typography

interface ExamCompletionProps {
    status: 'completed' | 'hidden' | 'expired'
    score?: number
    totalScore?: number
}
const TestFinsh = () => {
    const { status, score, totalScore } = { status: 'expired', score: 80, totalScore: 100 } as ExamCompletionProps
    const navigate = useNavigate()

    const handleReturnToMain = () => {
        navigate('/testMain')
    }

    const renderContent = () => {
        switch (status) {
            case 'completed':
                return (
                    <Space direction="vertical" size="large" style={{ width: '100%' }}>
                        <Statistic
                            title="您的得分"
                            value={score}
                            suffix={`/ ${totalScore}`}
                            valueStyle={{ color: '#3f8600' }}
                        />
                        <Button type="primary" onClick={handleReturnToMain}>
                            返回测试主页
                        </Button>
                    </Space>
                )
            case 'hidden':
                return (
                    <Paragraph>
                        本试卷考试完成后不允许查看详细得分。如有疑问，请联系您的老师。
                    </Paragraph>
                )
            case 'expired':
                return (
                    <Space direction="vertical" size="large" style={{ width: '100%' }}>
                        <Paragraph>
                            很抱歉，本次考试已经逾期，不允许参加考试。如有特殊情况，请联系您的老师。
                        </Paragraph>
                        <Button type="primary" onClick={handleReturnToMain}>
                            返回测试主页
                        </Button>
                    </Space>
                )
        }
    }

    const getIcon = () => {
        switch (status) {
            case 'completed':
                return <CheckCircleOutlined style={{ color: '#52c41a' }} />
            case 'hidden':
                return <LockOutlined style={{ color: '#faad14' }} />
            case 'expired':
                return <ClockCircleOutlined style={{ color: '#f5222d' }} />
        }
    }

    const getTitle = () => {
        switch (status) {
            case 'completed':
                return "考试已完成"
            case 'hidden':
                return "考试已完成"
            case 'expired':
                return "考试已逾期"
        }
    }

    const getSubTitle = () => {
        switch (status) {
            case 'completed':
                return "您可以查看您的成绩了"
            case 'hidden':
                return "老师暂时不允许查看成绩"
            case 'expired':
                return "已超过考试时间"
        }
    }
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', background: '#f0f2f5',borderRadius:'6px' }}>
            <Card style={{ width: 600, textAlign: 'center' }}>
                <Result
                    icon={getIcon()}
                    title={getTitle()}
                    subTitle={getSubTitle()}
                />
                {renderContent()}
            </Card>
        </div>
    )
}
export default TestFinsh