import { Modal } from "antd";
import { useCallback, useEffect, useRef, useState } from "react";
import { studentRecords } from "@renderer/api/student/chat";

interface StudentMessage {
    status: number;
    createTime: string;
    name: string;
    lessonStuId: number;
    stuClass: string;
    lessonName: string;
    updateTime: number;

}
interface Responsedata {
    code: number,
    data: any,
    msg: string
}
const useStudentMessage = () => {
    const [page, setPage] = useState(1);
    const [pageSize] = useState(10);
    const [data, setData] = useState<StudentMessage[]>([]);
    const [pages, setAllPages] = useState(2)
    const [loading, setLoading] = useState(false);
    const getTeacherApply = useCallback(async () => {
        if (loading) {
            return;
        }
        setLoading(true);
        if (pages > page) {
            setPage(page + 1)
        } else {
            return
        }
        const messageData = await studentRecords(page, pageSize);
        setData([...data, ...messageData.data.records]);
        setLoading(false);
        setAllPages(messageData.data.pages)
    }, [page]); // 
    useEffect(() => {
        getTeacherApply();
    }, [getTeacherApply]);
    useEffect(() => {
        getTeacherApply();
    }, []);

    return { pages, setPage, page, pageSize, data, getTeacherApply };
};

export default useStudentMessage;
