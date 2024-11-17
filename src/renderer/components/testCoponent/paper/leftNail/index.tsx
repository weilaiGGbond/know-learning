
import { Button } from "antd";
import QuestionTypeMenu from "../../testMain/typeTitle"
import QuestionNumbers from "../../testMain/number";
const PaperLeftNail = ({ examData,currentQuestionId,onSelect}) => {
    return (

        <>
            {
                examData.singleChoice.length != 0 ?
                    <>
                        <QuestionTypeMenu currentType='singleChoice' />
                        < QuestionNumbers
                            questions={examData.singleChoice}
                            currentQuestionId={
                                currentQuestionId
                            }
                            onSelect={onSelect}
                        />
                    </> : <></>
            }
            {
                examData.multipleChoice.length != 0 ?
                    <>
                        <QuestionTypeMenu currentType='multipleChoice' />
                        < QuestionNumbers
                            questions={examData.multipleChoice}
                            currentQuestionId={
                                currentQuestionId
                            }
                            onSelect={onSelect}
                        />
                    </> : <></>
            }
            {
                examData.essay.length != 0 ?
                    <>
                        <QuestionTypeMenu currentType='essay' />
                        < QuestionNumbers
                            questions={examData.essay}
                            currentQuestionId={
                                currentQuestionId
                            }
                            onSelect={onSelect}
                        />
                    </> : <></>
            }
        </>
    )
}
export default PaperLeftNail