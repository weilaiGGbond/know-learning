import { getPaperIdMethods, getPaperLeftQuestionMethods } from "@renderer/api/student/paper"
import { useState } from "react"
interface Props {
    code: number,
    data: number
}
interface PaperQuestion {
    code: number,
    data: {
        examName: string,
        radioList: checkList[],
        multiList: checkList[],
        judgeList: checkList[],
        bigList: checkList[],
    }
}
interface checkList {
    paperId: number,
    questionId: number,
    questionType: number,
    answered: number,
    //ansewerd ：0 未答题 1 已答题    

}
//学生获取考试信息包括答题逻辑
const StudentPaperHook = () => {
    const [paperId, setPaperId] = useState<number>()
    const getPaperId = async (examId: number, lessonId: number) => {
        const data = await getPaperIdMethods(examId, lessonId) as unknown as Props
        if (data.code == 20000) {
            setPaperId(data.data)
            if (data.data) {
                leftNailMessagepaper(data.data)
            }
        }
    }
    const [title, setTitle] = useState<string>()
    const [bigList, setBigList] = useState<checkList[]>([])
    const [judgeList, setJudgeList] = useState<checkList[]>([])
    const [multiList, setmultiList] = useState<checkList[]>([])
    const [radioList, setRadioList] = useState<checkList[]>([])
    const [allList, setAllList] = useState<checkList[]>([])
    //获取试卷左边信息
    const leftNailMessagepaper = async (id) => {
        const data = await getPaperLeftQuestionMethods(id) as unknown as PaperQuestion

        if (data.code == 20000) {
            setTitle(data.data.examName)
            const { bigList, judgeList, multiList, radioList } = data.data;
            let index = 1;
            const indexedRadioList = radioList.map((item) => ({ ...item, index: index++ }));
            const indexedMultiList = multiList.map((item) => ({ ...item, index: index++ }));
            const indexedJudgeList = judgeList.map((item) => ({ ...item, index: index++ }));
            const indexedBigList = bigList.map((item) => ({ ...item, index: index++ }));
            setBigList(indexedBigList);
            setJudgeList(indexedJudgeList);
            setmultiList(indexedMultiList);
            setRadioList(indexedRadioList);
            const allList = [...indexedRadioList, ...indexedMultiList, ...indexedJudgeList, ...indexedBigList];
            setAllList(allList);
        }

    }
    return {
        paperId,
        setPaperId,
        getPaperId,
        bigList,
        judgeList,
        multiList,
        radioList,
        title,
        allList
    }
}
export default StudentPaperHook