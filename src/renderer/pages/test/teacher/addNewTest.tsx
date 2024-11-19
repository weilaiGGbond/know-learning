import { Form, Input, InputNumber, DatePicker, Switch, Button, Typography, Space, message } from 'antd';
import { ClockCircleOutlined, EyeOutlined, FileSearchOutlined, CopyOutlined, TrophyOutlined, CheckCircleOutlined } from '@ant-design/icons';
import "@renderer/assets/styles/test/index.scss"
import { useEffect } from 'react';
import PreviewHook from '@renderer/hook/paper/preview';
import { createPaperMethods } from '@renderer/api/teacher/paper/preview';
import { useNavigate } from 'react-router-dom';
const { Title } = Typography;
const AddNewTest = () => {
    const navigate=useNavigate()
    const [form] = Form.useForm()
    const { RangePicker } = DatePicker;
    const { getPreviewList, bigList, judgeList, multiList, radioList,selectedRowKeys } = PreviewHook()
    useEffect(() => {
        getPreviewList()
    }, []);
    
    const onFinish = (values: any) => {
        const {
            passScore = 0,
            bigScore = 0,
            judgeScore = 0,
            multiScore = 0,
            radioScore = 0,
            keepTime,
            examTime, 
            ...rest
        } = values;
    
        const totalScore =
            bigScore * (bigList.length || 0) +
            judgeScore * (judgeList.length || 0) +
            multiScore * (multiList.length || 0) +
            radioScore * (radioList.length || 0);
    
        const [startTime, endTime] = examTime; 
        const formattedStartTime = startTime.format('YYYY-MM-DD HH:mm:ss');
        const formattedEndTime = endTime.format('YYYY-MM-DD HH:mm:ss');
        
        // 判断总成绩是否小于通过成绩
        console.log(totalScore);
    
        if (passScore > totalScore) {
            message.error('通过成绩不能大于总成绩');
            return;
        } else {
            const obj = {
                totalScore,
                bigCnt: bigList.length,
                judgeCnt: judgeList.length,
                multiCnt: multiList.length,
                radioCnt: radioList.length,
                startTime: formattedStartTime,
                endTime: formattedEndTime,
                passScore,
                bigScore,
                judgeScore,
                multiScore,
                radioScore,
                lessonId: 2,
                keepTime: Number(keepTime),
                questionIds: selectedRowKeys,
            };
    
            const objAll = {
                ...rest,
                ...obj,
            };
    
            addNewTest(objAll);
        }
    };
    
    const addNewTest = async (data) => {
        const sucessdata = await createPaperMethods(data) as any;
        if(sucessdata.code==20000){
            message.success('创建成功,将为你自动返回考试列表')
            setTimeout(() => {
                navigate('/questionBank')
            }, 1000)
        }else{
            message.error('创建失败')

        }
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
                        name="examTime"
                        label="考试时间"
                        rules={[{ required: true, message: '请输入考试时间' }]}
                    >
                        <RangePicker showTime />
                    </Form.Item>
                    <Form.Item
                        name="keepTime"
                        label="考试持续时间"
                        rules={[{ required: true, message: '请输入考试持续时间' }]}
                    >
                        <Space>
                            <InputNumber
                                min={0}
                                placeholder="请输入考试持续时间"
                                style={{ width: '100%' }}
                            /> <span>
                                <ClockCircleOutlined /> 分钟

                            </span>
                        </Space>
                    </Form.Item>
                    <Space>
                        {
                            radioList.length > 0 ?
                                <>
                                    <Form.Item
                                        name="radioScore"
                                        label="单选分数"
                                        rules={[{ required: true, message: '单选分数' }]}
                                    >
                                        <InputNumber
                                            min={0}
                                            placeholder="请输入通过成绩"
                                            style={{ width: '100%' }}
                                        />
                                    </Form.Item>
                                </> : null

                        }
                        {
                            multiList.length > 0 ?
                                <>
                                    <Form.Item
                                        name="multiScore"
                                        label="多选分数"
                                        rules={[{ required: true, message: '多选分数' }]}
                                    >
                                        <InputNumber
                                            min={0}
                                            placeholder="请输入多选成绩"
                                            style={{ width: '100%' }}
                                        />
                                    </Form.Item>
                                </>

                                : null
                        }
                    </Space>
                    <Space>
                        {
                            judgeList.length > 0 ?
                                <>
                                    <Form.Item
                                        name="judgeScore"
                                        label="判断分数"
                                        rules={[{ required: true, message: '判断分数' }]}
                                    >
                                        <InputNumber
                                            min={0}
                                            placeholder="请输入判断成绩"
                                            style={{ width: '100%' }}
                                        />
                                    </Form.Item>
                                </> : null
                        }
                        {
                            bigList.length > 0 ?
                                <>
                                    <Form.Item
                                        name="bigScore"
                                        label="简答分数"
                                        rules={[{ required: true, message: '简答分数' }]}
                                    >
                                        <InputNumber
                                            min={0}
                                            placeholder="请输入通过成绩"
                                            style={{ width: '100%' }}
                                        />
                                    </Form.Item>
                                </> : null
                        }
                    </Space>
                    <Form.Item
                        name="passScore"
                        label="通过成绩"
                        rules={[{ required: true, message: '请输入通过成绩' }]}
                    >
                        <InputNumber
                            min={0}
                            placeholder="请输入通过成绩"
                            style={{ width: '100%' }}
                        />
                    </Form.Item>
                    {/* 
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
                    </Space> */}

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
