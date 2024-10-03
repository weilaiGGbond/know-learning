import NailBar from '@renderer/components/layout/nailBar'
import React from 'react'
import '@renderer/assets/styles/test/index.scss'
import PreTest from '@renderer/components/test/preTest'

const Test = (): JSX.Element => {
    return (
        <div>
            <NailBar />
            <PreTest typeTitle='考试'>
                <div className='testMain__conten'>
                    <div className='testMain__mainConten'>
                        <p className='testMain__mainConten-show'>
                            <span>课程名称：</span>
                            <span>形式与政策</span>
                        </p>
                        <p className='testMain__mainConten-show'>
                            <span>开始时间：</span>
                            <span>2024-8-1 00:00:00</span>
                        </p>
                        <p className='testMain__mainConten-show'>
                            <span>结束时间：</span>
                            <span>2024-8-1 00:00:00</span>
                        </p>
                        <p className='testMain__mainConten-show'>
                            <span>大家注意学习时间</span>

                        </p>
                    </div>
                </div>
            </PreTest>
        </div>
    )
}
export default Test