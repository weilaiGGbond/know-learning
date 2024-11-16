import { ProList } from '@ant-design/pro-components';
import QuestionListHook from '@renderer/hook/questionbank/questionList';
import { Button, Checkbox, Select, Pagination, Space, Tag } from 'antd';
import type { Key } from 'react';
import Utils from '@renderer/utils/util'
const { timeAgo } = Utils
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface QuestionListProps {
    questionId: string;
    questionContent: string;
    questionSubject: string;
    questionType: number;
    questionLevel: number;
    createTime: number;
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
    const navigate = useNavigate()
    const gotoPreview = () => {
        navigate('/preview', { state: { questionId: selectedRowKeys } })
    }
    const { typeAll, page, total, questionList, setPage } = QuestionListHook();
    const subject = "JAVA";
    const [levelvalue, setLevelValue] = useState<number | undefined>();
    const [typevalue, setTypeValue] = useState<number | undefined>();
    const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);

    useEffect(() => {
        typeAll(levelvalue, page, 10, subject, typevalue);
    }, [levelvalue, typevalue, page]);

    const rowSelection = {
        selectedRowKeys,
        onChange: (keys: Key[]) => setSelectedRowKeys(keys),
    };

    const toggleSelectAll = () => {
        if (selectedRowKeys.length === questionList.length) {
            setSelectedRowKeys([]);
        } else {
            setSelectedRowKeys(questionList.map(item => item.questionId));
        }
    };
    const typeMapping = {
        0: '单选',
        1: '多选',
        2: '判断',
        3: '简答',
    };

    const levelMapping = {
        0: '简单',
        1: '中等',
        2: '困难',
    };
    const resetLevel = () => {
        setLevelValue(undefined);
        setTypeValue(undefined);
    }

    return (
        <ProList<QuestionListProps>
            toolBarRender={() => [
                <>

                    <Space direction="vertical" style={{ width: '100%' }}>
                        <Space>
                            <GetType levelvalue={levelvalue} setLevelValue={setLevelValue} />
                            <GetLevel typevalue={typevalue} setTypeValue={setTypeValue} />
                            <Button type="primary" onClick={resetLevel}>重置</Button>
                        </Space>
                        {
                            selectedRowKeys.length > 0 && <>
                                <Space>
                                    <Button type='link' style={{ color: 'red' }} onClick={() => {
                                        console.log(selectedRowKeys)
                                    }}>删除</Button>
                                    <Button type='link' style={{ color: '#1677ff' }} onClick={gotoPreview}>添加到试卷</Button>
                                </Space>
                            </>
                        }
                    </Space>
                </>
            ]}

            metas={{
                title: {
                    render: (text, item) => item.questionContent,
                },
                description: {
                    render: (text, item) => `创建时间: ${timeAgo(item.createTime)}`,

                },
                subTitle: {
                    render: (text, item) => {
                        return (
                            <Space size={0}>
                                <Tag color="blue">{typeMapping[item.questionType]}</Tag>
                                <Tag color="#5BD8A6">{levelMapping[item.questionLevel]}</Tag>
                            </Space>
                        );
                    },
                },
                actions: {
                    render: (text, row, index, action) => [
                        <a
                            onClick={() => {

                            }}
                            key="link"
                        >
                            查看题目
                        </a>,
                    ],
                },

            }}
            rowKey="questionId"
            headerTitle={
                <Checkbox onChange={toggleSelectAll} checked={selectedRowKeys.length === questionList.length}>
                    全选
                </Checkbox>
            }
            rowSelection={rowSelection}
            dataSource={questionList}
            footer={<Pagination defaultCurrent={page} total={total} align="end" onChange={(page) => {
                setPage(page)

            }}
            />}
        />
    );
};

export default QuestionListMain;
