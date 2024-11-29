import { getExamMethods } from "@renderer/api/teacher/paper/preview";
import { useCourse } from "@renderer/pages/course";
import { SetStateAction, useState } from "react";

interface Props {
    code: number,
    data: {
        total: SetStateAction<number>;
        pages:number,
        records:PageList[]
    },
}
interface PageList {
    hasFinshed: any;
    examId: number,
    lessonId: number,
    examName: string,
    totalScore: number,
    passScore: number,
    keepTime: number,
    startTime: string,
    endTime: string,
    createTime: number,
    hasFin:number
}

const PapperListHook = () => {
    const [page, setPage] = useState<number>(1);
    const [total, setTotalPage] = useState<number>(1);
    const [examName, setExamName] = useState<string | undefined>();
    const [paperList,setPaperList]=useState<PageList[]>()
    const { lessonId } = useCourse();
    const getPageList = async () => {
        const pagelist = await getExamMethods({
            examName,
            lessonId,
            pageNum: page,
            pageSize: 10,
        }) as unknown as Props

        
        if (pagelist.code == 20000) {
            
            setTotalPage(pagelist.data.total);
            console.log(total);
            
            setPaperList(pagelist.data.records)
        }
    }
    return {
        getPageList,
        page,
        total,
        examName,
        setExamName,
        setPage,
        paperList
    }
}
export default PapperListHook;
