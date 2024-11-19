import NailBar from '@renderer/components/layout/nailBar'
import React, { useState } from 'react'
import '@renderer/assets/styles/test/index.scss'
import { Button, message, Modal } from 'antd'
import icon from '@renderer/assets/icon.png'
import { useNavigate } from 'react-router-dom'
import TestLience from '../testCoponent/tesLience'
import ReturnNailbar from '../layout/returnNail'
const PreTest = (props): JSX.Element => {
    const { confirm } = Modal;
    const navigate = useNavigate()
    const gotoMemorandum = () => {
        navigate('/memorandum')
    }
    const [isModalVisible, setIsModalVisible] = useState(false);
    const confirmTest = () => {
        //status 1 考试中 2 已完成 0 未开始
        confirm({
            title: '确定考试',
            content: '确定参与考试？',
            onOk() {
                console.log('OK');
                if (status == 1) {
                    setIsModalVisible(true)
                } else if (status == 2) {
                    navigate('/testFinsh')
                } else {
                    message.error('考试未开始')
                }
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    const { typeTitle, children, status, title } = props
    return (
        <div className='testMain'>
            <div className='testMain__center'>

                <div style={{ padding: '10px' }}>
                    <ReturnNailbar />
                </div>


                <div className='testMain__center-title'>
                    <strong>
                        <span>
                            <strong>
                                {typeTitle}:
                                <span className='testMain__center-title-main'>
                                    <strong>
                                        {title}
                                    </strong>
                                </span>

                            </strong>
                        </span>
                    </strong>
                    <div className='testMain__center-right'>
                        <Button onClick={gotoMemorandum}>添加进备忘录</Button>
                    </div>
                </div>

            </div>
            <div className='testMain__conten'>
                <div className='testMain__conten-title'>
                    <span className='testMain__conten-title-color'>
                        {typeTitle}通知
                    </span>
                    <span className='testMain__conten-title-subtitle'>
                    </span>
                    <span className='testMain__conten-title-delete'>
                        删除
                    </span>
                </div>
            </div>
            {children}
            <div className='testMain__link' onClick={confirmTest}>
                <div className='testMain__link-main'>
                    <img src={icon} alt="" />
                    <div>
                        <span className='testMain__link-main-homework'>
                            {title}
                        </span>
                    </div>
                </div>

            </div>
            <TestLience isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} />
        </div>
    )
}
PreTest.defaultProps = {
    typeTitle: '暂无定义',
};
export default PreTest