
import { Button } from "antd";
import QuestionTypeMenu from "../../testMain/typeTitle"
import QuestionNumbers from "../../testMain/number";
const PaperLeftNail = ({ examData, bigList, judgeList, multiList, radioList, currentQuestionId, onSelect, id = true }) => {

    return (

        <>
            {
                radioList.length != 0 ?
                    <>
                        <QuestionTypeMenu currentType='singleChoice' />
                        < QuestionNumbers
                            questions={radioList}
                            currentQuestionId={
                                currentQuestionId
                            }
                            onSelect={onSelect}
                            id={id}
                        />
                    </> : <></>
            }

            {
                multiList.length != 0 ?
                    <>
                        <QuestionTypeMenu currentType='multipleChoice' />
                        < QuestionNumbers
                            questions={multiList}
                            currentQuestionId={
                                currentQuestionId
                            }
                            onSelect={onSelect}
                            id={id}
                        />
                    </> : <></>
            }
            {
                judgeList.length != 0 ?
                    <>
                        <QuestionTypeMenu currentType='judge' />
                        < QuestionNumbers
                            questions={judgeList}
                            currentQuestionId={
                                currentQuestionId
                            }
                            onSelect={onSelect}
                            id={id}

                        />
                    </> : <></>
            }
            {
                bigList.length != 0 ?
                    <>
                        <QuestionTypeMenu currentType='essay' />
                        < QuestionNumbers
                            questions={bigList}
                            currentQuestionId={
                                currentQuestionId
                            }
                            onSelect={onSelect}
                            id={id}
                        />
                    </> : <></>
            }
        </>
    )
}
export default PaperLeftNail