import React from 'react'
import '@renderer/styles/memorandum/index.scss'
import NailBar from '@renderer/components/layout/nailBar'
import Datedum from '@renderer/components/memorandum/date'
const MemorandumIndex = () => {
    return (
        <div>
            <NailBar />
            <div className='memorandum'>
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
                        
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default MemorandumIndex
