import { getPaperIdMethods, getPaperLeftQuestionMethods, getPaperQuestionIdMethods, sumbitAnswerMethods } from "@renderer/api/student/paper"
import { setSelectedStudentAnswers } from "@renderer/store/reducers/paper"
import { message } from "antd"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
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
interface QuestionByIdProps {
    code: number,
    data: QuestionIdProps
}
interface QuestionIdProps {
    questionContent: string | object,
    ansList: [],
    answer: null | Answer[],
    questionType: number
}
interface Answer {
    ansId: number,
    questionId: number,
    ansContent: string
}
interface checkList {
    index: number
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
    const dispatch = useDispatch();
    const selectedStudentIds = useSelector((state: any) => state.PaperSliceReducer.studentAnswers);
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
    //当前试卷信息
    const [PaperQuestion, setPaperQuestion] = useState<QuestionIdProps>()
    //获取题目数据 传递id 读取数据
    const getPaperquestion = async (paperId, questionID) => {
        const data = await getPaperQuestionIdMethods(paperId, questionID) as unknown as QuestionByIdProps
        if (data.code == 20000) {
            setPaperQuestion(data.data)
            //更新answer并将其存入store
            //判断一下类型
            if (data.data.questionType == 3) {
                if (selectedStudentIds.length > 0) {
                    dispatch(setSelectedStudentAnswers(data.data.answer))
                }
            } else {
                if (data.data.answer === null) {
                    console.log('我是空数组');
                    dispatch(setSelectedStudentAnswers([]))
                } else {
                    dispatch(setSelectedStudentAnswers(data.data.answer))
                }
            }
        }
    }
    //为了改变学生答案的通用方法
    const updateStudentAnswer = (type, ansewerd) => {
        if (type == 0) {
            //单选
            dispatch(setSelectedStudentAnswers([ansewerd]))
        } else if (type == 1) {
            //多选
            dispatch(setSelectedStudentAnswers([...selectedStudentIds, ansewerd]))
        } else if (type == 2) {
            //判断
            dispatch(setSelectedStudentAnswers([ansewerd]))
        } else if (type == 3) {
            //填空
            // dispatch(setSelectedStudentAnswers(ansewerd))

        }
    };
    //提交当前学生答案
    const sumbitAnswer = async (paperId, questionID) => {
        if (selectedStudentIds.length == 0 || selectedStudentIds == null) {
            message.warning('请先答题')
            return
        } else {
            const data = await sumbitAnswerMethods(paperId, questionID, selectedStudentIds) as unknown as Props
            if (data.code == 20000) {
                return true
            } else {
                message.error('提交失败')
                return false
            }
        }
    }
    //改数据
    const changeStatus = (id) => {
        const question = allList.find(item => item.questionId === id);

        if (question) {
            const { questionType } = question;

            if (questionType === 0) {
                const updatedRadioList = radioList.map(item => {
                    if (item.questionId === id) {
                        return { ...item, answer: 1 };
                    }
                    return item;
                })
                setRadioList(updatedRadioList);
            } else if (questionType === 1) {
                const updatedMultiList = multiList.map(item => {
                    if (item.questionId === id) {
                        return { ...item, answer: 1 };
                    }
                    return item;
                });
                setmultiList(updatedMultiList);
            } else if (questionType === 2) {
                const updatedJudgeList = judgeList.map(item => {
                    if (item.questionId === id) {
                        return { ...item, answer: 1 };
                    }

                    return item;
                });
                setJudgeList(updatedJudgeList);
            } else if (questionType === 3) {
                const updatedBigList = bigList.map(item => {
                    if (item.questionId === id) {
                        return { ...item, answer: 1 };
                    }
                    return item;
                });
                setBigList(updatedBigList);
            }

            const updatedAllList = allList.map(item => {
                if (item.questionId === id) {
                    return { ...item, answered: 1 };
                }
                return item;
            });
            setAllList(updatedAllList);
        }
    };
    //判断是不是全答题了
    const answerAll = () => {
        const allAnswered =
            bigList.every(item => item.answered === 1) &&
            judgeList.every(item => item.answered === 1) &&
            multiList.every(item => item.answered === 1) &&
            radioList.every(item => item.answered === 1);

        if (allAnswered) {
          return true
        } else {
           return false
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
        allList, getPaperquestion, PaperQuestion, updateStudentAnswer,
        sumbitAnswer,
        changeStatus,answerAll
        
    }
}
export default StudentPaperHook

