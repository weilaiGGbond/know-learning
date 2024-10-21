import { joinLesson } from "@renderer/api/teacher/chat";
import { useCallback, useEffect, useRef, useState } from "react";

interface TeacherMessage {
    status: number;
    createTime: string;
    name: string;
    lessonStuId: number;
    stuClass: string;
    lessonName: string;
}

const useTeacherMessage = () => {
    const [page, setPage] = useState(1);
    const [pageSize] = useState(10);
    const [data, setData] = useState<TeacherMessage[]>([]);
    const scrollRef = useRef<HTMLDivElement>(null);
    const [pages, setAllPages] = useState(1)
    const [flag, setFlag] = useState(false)
    const getTeacherApply = useCallback(async () => {
        const messageData = await joinLesson(page, pageSize);
        console.log(messageData);
        setData(messageData.data.records);
        setAllPages(messageData.data.pages)
    }, [page]); // 

    useEffect(() => {
        getTeacherApply();
    }, [getTeacherApply]);
    const teachermessageSroll = (() => {
        if (scrollRef.current) {
            setFlag(true)
            const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
            if (scrollTop + clientHeight >= scrollHeight) {
                //判断一下当前滑动页数
                if (page < pages) {
                    setFlag(false)
                    setPage((pre) => pre + 1);
                } else {
                    setFlag(true)
                    return
                }

            }
        }
    })
    return { flag, scrollRef, setPage, pageSize, data, teachermessageSroll };
};

export default useTeacherMessage;
