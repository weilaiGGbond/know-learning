import NailBar from '@renderer/components/layout/nailBar'
import React from 'react'
import '@renderer/assets/styles/test/index.scss'
import { Button } from 'antd'
import icon from '@renderer/assets/icon.png'
import { useNavigate } from 'react-router-dom'
const PreTest = (props): JSX.Element => {
    const navigate = useNavigate()
    const gotoMemorandum = () => {
        navigate('/memorandum')
    }
    const confirmTest = () => {

    }

    const { typeTitle, children } = props
    return (
        <div className='testMain'>
            <div className='testMain__center'>
                <div className='testMain__center-title'>
                    <strong>
                        <span>
                            <strong>
                                {typeTitle}:

                                <span className='testMain__center-title-main'>
                                    <strong>
                                        通信原理第四章作业
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
                        9-27 16:00 至 9-28 16:00
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
                            第五章作业
                        </span>
                    </div>
                </div>

            </div>
        </div>
    )
}
PreTest.defaultProps = {
    typeTitle: '暂无定义',
};
export default PreTest