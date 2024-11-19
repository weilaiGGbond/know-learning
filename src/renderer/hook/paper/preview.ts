import { getPreviewListMethods } from "@renderer/api/teacher/paper/preview";
import { useState } from "react";
import { useSelector } from "react-redux";

interface PreviewQuestion {
    questionContent: string,
    questionType: number,
    id: number
    ansList: AnswerList[],
}
interface AnswerList {
    ansContent: string;
}
interface preData {
    code: number,
    data: {
        bigList: PreviewQuestion[],
        judgeList: PreviewQuestion[],
        multiList: PreviewQuestion[],
        radioList: PreviewQuestion[],
    },

}
const PreviewHook = () => {
    const selectedRowKeys = useSelector((state: any) => state.PaperSliceReducer.selectedQuestionIds);
    const [bigList, setBigList] = useState<PreviewQuestion[]>([])
    const [judgeList, setJudgeList] = useState<PreviewQuestion[]>([])
    const [multiList, setmultiList] = useState<PreviewQuestion[]>([])
    const [radioList, setRadioList] = useState<PreviewQuestion[]>([])
    const [allList, setAllList] = useState<PreviewQuestion[]>([])
    const getPreviewList = async () => {
        if (selectedRowKeys.length === 0) {
            return;
        }
        const idsString = selectedRowKeys.map(id => `ids=${id}`).join('&');
        const PreviewData = await getPreviewListMethods(idsString) as unknown as preData;

        if (PreviewData.code == 20000) {
            const { bigList, judgeList, multiList, radioList } = PreviewData.data;
            let index = 1;
            const indexedRadioList = radioList.map((item) => ({ ...item, id: index++ }));
            const indexedMultiList = multiList.map((item) => ({ ...item, id: index++ }));
            const indexedJudgeList = judgeList.map((item) => ({ ...item, id: index++ }));
            const indexedBigList = bigList.map((item) => ({ ...item, id: index++ }));



            setBigList(indexedBigList);
            setJudgeList(indexedJudgeList);
            setmultiList(indexedMultiList);
            setRadioList(indexedRadioList);
            const allList = [...indexedRadioList, ...indexedMultiList, ...indexedJudgeList, ...indexedBigList];
            setAllList(allList);
        }
    };

    return {
        getPreviewList,
        bigList,
        judgeList,
        multiList,
        radioList,
        allList,
        selectedRowKeys

    };
};

export default PreviewHook;