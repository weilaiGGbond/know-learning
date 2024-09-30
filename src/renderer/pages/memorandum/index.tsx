import React from 'react'
import '@renderer/assets/styles/memorandum/index.scss'
import NailBar from '@renderer/components/layout/nailBar'
import Datedum from '@renderer/components/memorandum/date'
import MemoranList from '@renderer/components/memorandum/list'
const MemorandumIndex = () => {
    return (
        <div>
            <div className='memorandum srollBar'>
                <div className='memorandum__main'>
                    <div className='memorandum__main-left'>
                        <Datedum />
                    </div>
                    <div className='memorandum__main-right'>
                        <div className='memorandum__main-right-title'>
                            <strong>
                                今日计划
                            </strong>
                        </div>
                        <div className='memorandum__main-right-conten'>
                            <div className='memorandum__main-right-contenshow'>
                               <div className='memorandumlist srollBar'>
                               <MemoranList/>
                               </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default MemorandumIndex
