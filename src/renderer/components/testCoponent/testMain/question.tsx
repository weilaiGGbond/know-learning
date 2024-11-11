import { Checkbox, Radio, Typography } from "antd";
import TextArea from "antd/es/input/TextArea";
import MyEditor from "./eidtor";

// 题目内容组件
const { Title, Text } = Typography;
const QuestionContent = ({ question, type }) => {
    console.log(question, '222222');
    return (

        < div >
            <Title level={4} className="mb-4">
                <Text type="secondary">题目 {question.id}（{question.score}分）</Text>
            </Title>
            <Text>{question.question}</Text>
            {
                type === 'singleChoice' && (
                    <Radio.Group className="mt-4 flex flex-col gap-2">
                        {question.options.map((option, i) => (
                            <Radio key={i} value={i} className="!flex items-center">
                                <Text className="ml-2">{option}</Text>
                            </Radio>
                        ))}
                    </Radio.Group>
                )
            }
            {
                type === 'multipleChoice' && (
                    <Checkbox.Group className="mt-4 flex flex-col gap-2">
                        {question.options.map((option, i) => (
                            <Checkbox key={i} value={i} className="!flex items-center">
                                <Text className="ml-2">{option}</Text>
                            </Checkbox>
                        ))}
                    </Checkbox.Group>
                )
            }
            {
                type === 'essay' && (
                    // <TextArea rows={6} className="mt-4" placeholder="请在此输入您的答案" />
                    <MyEditor/>
                )
            }
        </div >
    )

}

export default QuestionContent;