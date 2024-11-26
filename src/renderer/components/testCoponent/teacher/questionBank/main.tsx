import { ProList } from '@ant-design/pro-components';
import QuestionListHook from '@renderer/hook/questionbank/questionList';
import { Button, Checkbox, Select, Pagination, Space, Tag, Input, Modal } from 'antd';
import type { Key } from 'react';
import Utils from '@renderer/utils/util'
const { timeAgo } = Utils
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedQuestionIds } from '@renderer/store/reducers/paper';
import CommmomLevel from '@renderer/components/testCoponent/question/common'
import IDQuestion from '../../question/idQuestion';

const { levelMapping, typeMapping } = CommmomLevel
const { Search } = Input;
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
    const { typeAll, page, total, questionList, setPage, subject, setSubject } = QuestionListHook();

    const [levelvalue, setLevelValue] = useState<number | undefined>();
    const [typevalue, setTypeValue] = useState<number | undefined>();
    const dispatch = useDispatch();
    const selectedRowKeys = useSelector((state: any) => state.PaperSliceReducer.selectedQuestionIds);
    //弹窗
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [nowId, setNowId] = useState<string | undefined>()


    useEffect(() => {
        typeAll(levelvalue, page, 10, subject, typevalue);
    }, [levelvalue, typevalue, page, subject]);

    const rowSelection = {
        selectedRowKeys,
        onChange: (keys: Key[]) => {
            dispatch(setSelectedQuestionIds(keys));
        },
    };
    const onSearch = (value) => {
        setSubject(value)
    }
    const toggleSelectAll = () => {
        if (selectedRowKeys.length === questionList.length) {
            dispatch(setSelectedQuestionIds([]));
        } else {
            dispatch(setSelectedQuestionIds(questionList.map(item => item.questionId)))
        }
    };

    const resetLevel = () => {
        setLevelValue(undefined);
        setTypeValue(undefined);
        setSubject(undefined)
    }
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <>

            <ProList<QuestionListProps>
                toolBarRender={() => [
                    <Space direction="vertical" style={{ width: '100%' }}>
                        <Space>
                            <Search
                                placeholder="输入学科名称"
                                onSearch={onSearch}
                                style={{ width: 200 }}
                            />
                            <GetType levelvalue={levelvalue} setLevelValue={setLevelValue} />
                            <GetLevel typevalue={typevalue} setTypeValue={setTypeValue} />
                            <Button type="primary" onClick={resetLevel}>重置</Button>
                            {selectedRowKeys.length > 0 && (
                                <Button
                                    type='link'
                                    style={{ color: '#1677ff' }}
                                    onClick={gotoPreview}
                                >
                                    添加到试卷
                                </Button>
                            )}
                        </Space>
                    </Space>
                ]}
                metas={{
                    title: {
                        render: (text, item) => (
                            <span dangerouslySetInnerHTML={{ __html: item.questionContent }} />
                        ),
                    },
                    description: {
                        render: (text, item) => `创建时间: ${timeAgo(item.createTime)}`,
                    },
                    subTitle: {
                        render: (text, item) => (
                            <Space size={0}>
                                <Tag color="blue">{typeMapping[item.questionType]}</Tag>
                                <Tag color="#5BD8A6">{levelMapping[item.questionLevel]}</Tag>
                            </Space>
                        ),
                    },
                    actions: {
                        render: (text, row, index, action) => [
                            <a
                                onClick={() => {
                                    showModal();
                                    setNowId(row.questionId);
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
                    <Checkbox
                        onChange={toggleSelectAll}
                        checked={selectedRowKeys.length === questionList.length}
                    >
                        全选
                    </Checkbox>
                }
                rowSelection={rowSelection}
                dataSource={questionList}
                footer={
                    <Pagination
                        defaultCurrent={page}
                        total={total}
                        align="end"
                        onChange={(page) => setPage(page)}
                    />
                }
            />

            <Modal title="题目详情" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <IDQuestion id={nowId} />
            </Modal>
        </>
    );
};

export default QuestionListMain;
