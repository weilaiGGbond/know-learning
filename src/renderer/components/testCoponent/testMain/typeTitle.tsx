import { Typography } from "antd";

// 题目类型组件
const { Title, Text } = Typography;
const QuestionTypeMenu = ({ currentType }) => (
    <div className="mb-6">
        <Title level={4} className="cursor-pointer mb-2">
            <Text type="secondary">
                {currentType === 'singleChoice' && '单选题'}
                {currentType === 'multipleChoice' && '多选题'}
                {currentType === 'judge' && '判断题'}
                {currentType === 'essay' && '简答题'}
            </Text>
        </Title>
    </div>
);

export default QuestionTypeMenu;
