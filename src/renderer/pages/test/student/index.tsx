import NailBar from '@renderer/components/layout/nailBar'
import React from 'react'
import '@renderer/assets/styles/test/index.scss'
import PreTest from '@renderer/components/test/preTest'
import { useLocation } from 'react-router-dom'
import Util from '@renderer/utils/util'
import ReturnNailbar from '@renderer/components/layout/returnNail'
const Test = (): JSX.Element => {
    // const status = 2
    const location = useLocation();
    const { status, exam, name } = location.state || {};

    return (
        <>
            <PreTest typeTitle='考试' status={status} title={exam.examName}>

                <div className='testMain__conten'>

                    <div className='testMain__mainConten'>
                        <p className='testMain__mainConten-show'>
                            <span>课程名称：</span>
                            <span>{name.lessonName}</span>
                        </p>
                        <p className='testMain__mainConten-show'>
                            <span>开始时间：</span>
                            <span>{Util.getTImeStarandEnd(exam.startTime)}</span>
                        </p>
                        <p className='testMain__mainConten-show'>
                            <span>结束时间：</span>
                            <span>{Util.getTImeStarandEnd(exam.endTime)}</span>
                        </p>
                        <p className='testMain__mainConten-show'>
                            <span>大家注意考试时间</span>
                        </p>
                    </div>
                </div>
            </PreTest>


        </>


    )
}
export default Test