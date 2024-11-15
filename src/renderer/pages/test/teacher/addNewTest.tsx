import { Form, Input, InputNumber, DatePicker, Switch, Button, Typography, Space } from 'antd';
import { ClockCircleOutlined, EyeOutlined, FileSearchOutlined, CopyOutlined, TrophyOutlined, CheckCircleOutlined } from '@ant-design/icons';
import "@renderer/assets/styles/test/index.scss"
const { Title } = Typography;
const AddNewTest = () => {
    const [form] = Form.useForm();

    const onFinish = (values: any) => {
        console.log('Received values:', values);
    }
    return (
        <div className='testMainshow'>
            <div style={{ maxWidth: 600, margin: '0 auto', padding: '24px' }}>
                <Title level={2} style={{ marginBottom: '24px' }}>新建考试</Title>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="examName"
                        label="考试名称"
                        rules={[{ required: true, message: '请输入考试名称' }]}
                    >
                        <Input placeholder="请输入考试名称" />
                    </Form.Item>

                    <Form.Item
                        name="examDateTime"
                        label="考试时间"
                        rules={[{ required: true, message: '请选择考试时间' }]}
                    >
                        <DatePicker
                            showTime
                            format="YYYY-MM-DD HH:mm"
                            placeholder="选择考试日期和时间"
                            style={{ width: '100%' }}
                        />
                    </Form.Item>

                    <Form.Item
                        name="totalScore"
                        label="总分"
                        rules={[{ required: true, message: '请输入考试总分' }]}
                    >
                        <InputNumber
                            min={0}
                            placeholder="请输入考试总分"
                            style={{ width: '100%' }}
                        />
                    </Form.Item>

                    <Form.Item
                        name="passingScore"
                        label="通过成绩"
                        rules={[{ required: true, message: '请输入通过成绩' }]}
                    >
                        <InputNumber
                            min={0}
                            placeholder="请输入通过成绩"
                            style={{ width: '100%' }}
                        />
                    </Form.Item>

                    <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                        <Form.Item
                            name="allowReview"
                            valuePropName="checked"
                            style={{ marginBottom: 0 }}
                        >
                            <Space>
                                <Switch />
                                <span><EyeOutlined /> 允许考完查看</span>
                            </Space>
                        </Form.Item>

                        <Form.Item
                            name="showScore"
                            valuePropName="checked"
                            style={{ marginBottom: 0 }}
                        >
                            <Space>
                                <Switch />
                                <span><FileSearchOutlined /> 允许查看分数</span>
                            </Space>
                        </Form.Item>

                        <Form.Item
                            name="detectPlagiarism"
                            valuePropName="checked"
                            style={{ marginBottom: 0 }}
                        >
                            <Space>
                                <Switch />
                                <span><CopyOutlined /> 允许检测抄袭</span>
                            </Space>
                        </Form.Item>
                    </Space>

                    <Form.Item style={{ marginTop: '24px' }}>
                        <Button type="primary" htmlType="submit" block>
                            创建考试
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}
export default AddNewTest
