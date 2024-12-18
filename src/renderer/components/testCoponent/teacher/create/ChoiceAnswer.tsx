//cv yjl的组件

import { Button, Input, message, Popover, Upload, UploadProps } from 'antd'
import { numberToLetter } from './create'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import StudentPaperHook from '@renderer/hook/paper/student'
interface Choice {
    ansContent: string
    isRight: number
}
function ChoiceAnswer({
    items,
    index,
    questionType,
}) {
    //多选1 则进入这个判断

    const { updateStudentAnswer } = StudentPaperHook();
    const selectedStudentIds = useSelector((state: any) => state.PaperSliceReducer.studentAnswers)
    const [isAnswered, setIsAnswered] = useState(false)
    useEffect(()=>{
        if (questionType == 1) {
            const flag = selectedStudentIds.includes(items.ansId)
            setIsAnswered(flag)
        } else {
            let answerflag=false
            if (selectedStudentIds == items.ansId) {
                answerflag=true
            }
            setIsAnswered(answerflag)
        }
    },[questionType,selectedStudentIds])
    const changeAnswerShow = (questionType, ansId) => {
        updateStudentAnswer(questionType, ansId)
    }
    return (
        <div
            className={`flex gap-3 border bg-white p-3 justify-between cursor-pointer rounded items-center ${items.isRight === 1 ? 'text-green-600 border-green-600' : ''
                }`}
            onClick={() => changeAnswerShow(questionType, items.ansId)}
        >
            <div className="flex gap-3 items-center">
                <div
                    className={`border w-9 h-9 flex items-center justify-center rounded 
                    ${isAnswered ? 'text-green-600 border-green-600' : ''}`}
                >
                    {numberToLetter(index)}
                </div>
                <div>
                    <MyComponent content={items.ansContent} />
                </div>
            </div>

        </div>
    )
}
const renderContent = (url) => {
    if (typeof url !== 'string') {
        return null;
    }

    if (url.startsWith('http')) {
        return <img src={url} alt="Image" />;
    } else {
        return <span>{url}</span>;
    }
};

const MyComponent = ({ content }) => {
    return (
        <div>
            {renderContent(content)}
        </div>
    );
};
export default ChoiceAnswer
