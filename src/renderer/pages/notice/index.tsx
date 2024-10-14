import React, { useState } from 'react';
import '@renderer/assets/styles/notice/index.scss';
import { Avatar, Button, Checkbox, Divider, List } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import { useNavigate } from 'react-router-dom';
const NoticeSystem = (): JSX.Element => {
    const navigate = useNavigate()
    const [checkedList, setCheckedList] = useState<string[]>(['Apple', 'Orange']);
    const [indeterminate, setIndeterminate] = useState(true);
    const [checkAll, setCheckAll] = useState(false);
    const data = [
        { title: '考试通知', value: 'Apple' },
        { title: '学习通知', value: 'Pear' },
        { title: '课程结束', value: 'Orange' },
        { title: '考试通知', value: 'Banana' },
        { title: '课程结束', value: 'Orange' },
        { title: '考试通知', value: 'Banana' },
        { title: '课程结束', value: 'Orange' },
        { title: '考试通知', value: 'Banana' },
        { title: '课程结束', value: 'Orange' },
        { title: '考试通知', value: 'Banana' },
    ];
    const gotoTest=()=>{
        navigate('/test')
    }
    const onCheckChange = (value: string) => {
        const newCheckedList = checkedList.includes(value)
            ? checkedList.filter(item => item !== value)
            : [...checkedList, value];

        setCheckedList(newCheckedList);
        setIndeterminate(!!newCheckedList.length && newCheckedList.length < data.length);
        setCheckAll(newCheckedList.length === data.length);
    };

    const onCheckAllChange = (e: CheckboxChangeEvent) => {
        const newCheckedList = e.target.checked ? data.map(item => item.value) : [];
        setCheckedList(newCheckedList);
        setIndeterminate(false);
        setCheckAll(e.target.checked);
    };

    return (
        <div className="h-full notifyMain">
            <div className="h-full srollBar">
                <div className='notifyMain__title'>
                    <div className='notifyMain__title-flex'>
                        <Checkbox
                            indeterminate={indeterminate}
                            onChange={onCheckAllChange}
                            checked={checkAll}
                        >
                            全选
                        </Checkbox>
                        {checkedList.length != 0 && (
                            <div className="additional-component">
                                <Button type='text' style={{ color: '#1677ff' }}>
                                    一键已读
                                </Button>
                                <Button type='text' style={{ color: '#fa696c' }}>
                                    删除
                                </Button>
                            </div>
                        )}
                    </div>
                    <Divider />
                    <List
                        itemLayout="horizontal"
                        dataSource={data}
                        renderItem={item => (
                            <List.Item onClick={gotoTest}>
                                <div className='checkBox'>
                                    <Checkbox
                                        checked={checkedList.includes(item.value)}
                                        onChange={() => onCheckChange(item.value)}
                                    />
                                </div>
                                <List.Item.Meta
                                    avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                                    title={item.title}
                                    description="您收到一条作业"
                                />
                                <div className='checkBox'>
                                    <Button type='text' style={{ color: '#1677ff' }}>
                                        置顶
                                    </Button>
                                    <Button type='text' style={{ color: '#fa696c' }}>
                                        删除
                                    </Button>
                                    <Button type='text' style={{ color: '#46cd55' }}>
                                        标记未读
                                    </Button>
                                </div>
                            </List.Item>
                        )}
                    />
                </div>
            </div>
        </div>
    );
};

export default NoticeSystem;
