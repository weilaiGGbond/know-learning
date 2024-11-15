import { ProList } from '@ant-design/pro-components';
import QuestionListHook from '@renderer/hook/questionbank/questionList';
import { Avatar, Button, Checkbox, Input, List, Pagination, Select } from 'antd';
import type { Key } from 'react';
import { useEffect, useState } from 'react';

interface QuestionListProps {
    questionId: string;
    questionContent: string;
    questionSubject: string;
    questionType: number;
    questionLevel: number;
    createTime: string;
}

const GetType = ({ levelvalue, setLevelValue }): JSX.Element => {
    const options = [
        { value: 0, label: '简单' },
        { value: 1, label: '中等' },
        { value: 2, label: '困难' },
    ];

    const onChange = (value: number) => {
        setLevelValue(value);
    };

    return (
        <Select
            showSearch
            placeholder="选择难度"
            style={{ width: 120 }}
            options={options}
            onChange={onChange}
            value={levelvalue}
        />
    );
};

const GetLevel = ({ typevalue, setTypeValue }): JSX.Element => {
    const options = [
        { value: 0, label: '单选' },
        { value: 1, label: '多选' },
        { value: 2, label: '判断' },
        { value: 3, label: '简答' },
    ];

    const onChange = (value: number) => {
        setTypeValue(value);
    };

    return (
        <Select
            showSearch
            placeholder="选择题目类型"
            style={{ width: 120 }}
            options={options}
            onChange={onChange}
            value={typevalue}
        />
    );
};

const QuestionListMain = () => {
    const { typeAll, page, total, questionList } = QuestionListHook();
    const subject = "JAVA";
    const [levelvalue, setLevelValue] = useState<number | undefined>();
    const [typevalue, setTypeValue] = useState<number | undefined>();
    const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);

    useEffect(() => {
        typeAll(levelvalue, page, 10, subject, typevalue);
    }, [levelvalue, typevalue, page, subject]); // 添加依赖项

    const rowSelection = {
        selectedRowKeys,
        onChange: (keys: Key[]) => setSelectedRowKeys(keys),
    };

    const toggleSelectAll = () => {
        if (selectedRowKeys.length === questionList.length) {
            setSelectedRowKeys([]);
        } else {
            setSelectedRowKeys(questionList.map(item => item.questionId)); // 使用 questionId 作为唯一标识
        }
    };

    return (
        <ProList<QuestionListProps>
            toolBarRender={() => [
                <>
                    <GetType levelvalue={levelvalue} setLevelValue={setLevelValue} />
                    <GetLevel typevalue={typevalue} setTypeValue={setTypeValue} />
                    <Button type="primary">重置</Button>
                </>
            ]}
            metas={{
                title: {
                    render: (text, item) => item.questionContent, 
                },
                description: {
                    render: (text, item) => `类型: ${item.questionType}, 难度: ${item.questionLevel}`,
                },
                avatar: {
                    render: (text, item) => <Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${item.questionId}`} />, // 使用 questionId 生成头像
                },
            }}
            rowKey="questionId" // 使用 questionId 作为唯一标识
            headerTitle={
                <Checkbox onChange={toggleSelectAll} checked={selectedRowKeys.length === questionList.length}>
                    全选
                </Checkbox>
            }
            rowSelection={rowSelection}
            dataSource={questionList}
            footer={<Pagination defaultCurrent={page} total={total} align="end" />}
        />
    );
};

export default QuestionListMain;
