import { Checkbox, Radio, Typography } from "antd";
import MyEditor from "./eidtor";
import ChoiceAnswer from "../teacher/create/ChoiceAnswer";
import StudentPaperHook from "@renderer/hook/paper/student";
import { useEffect } from "react";
import RichTextEditor from "../teacher/create/RichEditor";
import { useSelector } from "react-redux";

// 题目内容组件
const { Title, Text } = Typography;

const QuestionStudentAnswer = ({ id, currentID, paperId }) => {
    // 获取当前试卷信息
    const { getPaperquestion, PaperQuestion, updateStudentAnswer } = StudentPaperHook();
    useEffect(() => {
        if (paperId && id) {
            getPaperquestion(paperId, id);
        }
    }, [id, paperId]);
    const selectedStudentIds = useSelector((state: any) => state.PaperSliceReducer.studentAnswers);
    function handleJSON(arg0: string, value: any) {

    }

    return (
        <div>
            <Title level={4} className="mb-4">
                <Text type="secondary">题目 {currentID}

                </Text>
            </Title>
            <Text>
                {
                    PaperQuestion?.questionContent ? <span dangerouslySetInnerHTML={{ __html: PaperQuestion?.questionContent }} /> : null
                }
            </Text>
            {PaperQuestion && PaperQuestion.questionType !== 3 && (
                <div className="max-h-[350px] pl-2">
                    <div className="choices flex flex-col gap-2 justify-between max-h-[350px]">
                        {PaperQuestion.ansList.map((items, index) => (
                            <ChoiceAnswer
                                key={index}
                                questionType={PaperQuestion.questionType}
                                items={items}
                                index={index} />
                        ))}
                    </div>
                </div>
            )}
            {PaperQuestion && PaperQuestion.questionType === 3 && (
                <>
                    <RichTextEditor
                        value={selectedStudentIds}
                        onChange={(value) => {
                            updateStudentAnswer(PaperQuestion.questionType, value)
                        }
                        }
                        getJSON={(value) => handleJSON('itemContent', value)}
                    />
                </>
            )}
        </div>
    );
};

export default QuestionStudentAnswer;
