import { getQuestionList } from "@renderer/api/teacher/questionBank";
import { useState } from "react";
interface QuestionListProps {
    questionId: string,
    questionContent: string,
    questionSubject: string,
    questionType: number,
    questionLevel: number,
    createTime: number,
}
interface QuestionRes {
    code: number,
    data: {
        records: QuestionListProps[],

    },

    total: number,
}
const QuestionListHook = () => {

    //获取当前题库内容
    const [page, setPage] = useState(1);
    const [level, setLevel] = useState(1);
    const [total, setTotal] = useState(1);
    const [questionList, setQuestionList] = useState<QuestionListProps[]>([]);
    const typeAll = async (level: number | undefined, pageNum: number, pageSize: number, subject: string, type: number | undefined) => {
        const data = await getQuestionList({
            level: level !== undefined ? level : undefined,
            pageNum,
            pageSize,
            subject,
            type: type !== undefined ? type : undefined
        }) as unknown as QuestionRes;
        if (data.code === 20000) {
            setTotal(data.total);
            setQuestionList(data.data.records);
        }

    };

    return {
        page,
        level,
        typeAll,
        questionList,
        total,
        setPage

    }

}
export default QuestionListHook