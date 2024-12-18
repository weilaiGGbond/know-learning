import { getAllBankList, getQuestionList } from "@renderer/api/teacher/questionBank";
import { SetStateAction, useState } from "react";
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
        total: SetStateAction<number>;
        records: QuestionListProps[],

    },

    total: number,
}
interface BankRes {
    code: number,
    data: {
        records: any[],

    },
}
interface BankListProps {
    repoId: string,
    repoTitle: string,
    subject: number,
}


const QuestionListHook = () => {

    //获取当前题库内容
    const [page, setPage] = useState(1);
    const [level, setLevel] = useState(1);
    const [total, setTotal] = useState(1);
    const [subject, setSubject] = useState<string | undefined>();
    const [questionList, setQuestionList] = useState<QuestionListProps[]>([]);
    const typeAll = async (level: number | undefined, pageNum: number, pageSize: number, subject: string|undefined, type: number | undefined) => {
        const data = await getQuestionList({
            level: level !== undefined ? level : undefined,
            pageNum,
            pageSize,
            subject:subject!== undefined ? subject : undefined,
            type: type !== undefined ? type : undefined
        }) as unknown as QuestionRes;
    if (data.code === 20000) {
        console.log(data,'21111' );
        setTotal(data.data.total);
        setQuestionList(data.data.records);
    }

};
const [reportbank, setReportBank] = useState<BankListProps[]>([]);

//获取当前创建的题库所有的
const getAllBank = async () => {
    const data = await getAllBankList() as unknown as BankRes;
    if (data.code === 20000) {
        setReportBank(data.data.records);
    }
}
return {
    page,
    level,
    typeAll,
    questionList,
    total,
    setPage,
    reportbank,
    getAllBank,
    subject,
    setSubject,

}

}
export default QuestionListHook