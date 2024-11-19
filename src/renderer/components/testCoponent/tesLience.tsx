import { ExclamationCircleOutlined } from "@ant-design/icons"
import { Button, List, Modal, Space, Typography } from "antd"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const { Title, Paragraph } = Typography

const TestLience = ({ isModalVisible, setIsModalVisible }) => {
    const navigate = useNavigate()
    const handleOk = () => {
        setIsModalVisible(false)
    }
    const gotoTestMain = () => {
        setIsModalVisible(false)
        navigate('/testMain')
    }


    const examTime = "2024年6月15日 14:00-16:00"
    const examInstructions = [
        "请提前15分钟进入考场，并关闭所有通讯设备。",
        "考试期间不得使用任何未经允许的参考资料。",
        "如有问题请举手示意，监考员会来协助您。",
        "答题前请仔细阅读每道题目的要求。",
        "请合理分配时间，确保能够完成所有题目。",
        "考试结束前10分钟，监考员会提醒您。",
        "考试结束后，请立即停止答题，等待监考员收卷。",
    ]
    return (
        <div>
            <Modal
                title={
                    <Space>
                        <ExclamationCircleOutlined style={{ color: '#faad14' }} />
                        考试信息
                    </Space>
                }
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleOk}
                footer={[
                    <Button key="submit" type="primary" onClick={gotoTestMain}>
                        我已了解
                    </Button>,
                ]}
                width={600}
            >
               
                <Title level={4}>考试须知</Title>
                <List
                    dataSource={examInstructions}
                    renderItem={(item) => (
                        <List.Item>
                            <Typography.Text>{item}</Typography.Text>
                        </List.Item>
                    )}
                />
            </Modal>
        </div>
    )
}
export default TestLience