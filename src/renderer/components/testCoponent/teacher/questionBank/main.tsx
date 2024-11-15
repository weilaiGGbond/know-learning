import { ProList } from '@ant-design/pro-components';
import { Button, Checkbox, Input, Pagination } from 'antd';
import type { Key } from 'react';
import { useState } from 'react';

const dataSource = [
    {
        title: '语雀的天空',
        avatar:
            'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
    },
    {
        title: 'Ant Design',
        avatar:
            'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
    },
    {
        title: '蚂蚁金服体验科技',
        avatar:
            'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
    },
    {
        title: 'TechUI',
        avatar:
            'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
    },
];

const QuestionListMain = () => {
    const { Search } = Input;
    const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
    const onSearch = (value: string) => {
        console.log('search:', value);
    }
    const rowSelection = {
        selectedRowKeys,
        onChange: (keys: Key[]) => setSelectedRowKeys(keys),
    };

    const toggleSelectAll = () => {
        if (selectedRowKeys.length === dataSource.length) {
            setSelectedRowKeys([]);
        } else {
            setSelectedRowKeys(dataSource.map(item => item.title));
        }
    };

    return (
        <ProList<{ title: string }>
            toolBarRender={() => {
                return [
                    <Search placeholder="按题目内容搜索" onSearch={onSearch} style={{ width: 200 }} />
                ];
            }}
            metas={{
                title: {},
                description: {
                    render: () => {
                        return 'Ant Design, a design language for background applications, is refined by Ant UED Team';
                    },
                },
                avatar: {},
                extra: {
                    render: () => (
                        <div
                            style={{
                                minWidth: 200,
                                flex: 1,
                                display: 'flex',
                                justifyContent: 'flex-end',
                            }}
                        >
                            <div
                                style={{
                                    width: '200px',
                                }}
                            >
                                {/* 这里可以添加额外的内容 */}
                            </div>
                        </div>
                    ),
                },
            }}
            rowKey="title"
            headerTitle={
                <Checkbox onChange={toggleSelectAll} checked={selectedRowKeys.length === dataSource.length}>
                    全选
                </Checkbox>
            }
            rowSelection={rowSelection}
            dataSource={dataSource}
            footer={
                <Pagination defaultCurrent={1} total={50} align="end"/>
            }
        />
        
    );
};

export default QuestionListMain;
