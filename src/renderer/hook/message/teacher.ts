import { aduitStudentApplication, joinLesson, readMessage } from "@renderer/api/teacher/chat";
import { Modal } from "antd";
import { useCallback, useEffect, useRef, useState } from "react";
import userMessage from "./user";

interface TeacherMessage {
    status: number;
    createTime: string;
    name: string;
    lessonStuId: number;
    stuClass: string;
    lessonName: string;
}
interface Responsedata {
    code: number,
    data: any,
    msg: string
}
const useTeacherMessage = () => {
    const { setRead } = userMessage()
    const { confirm } = Modal;
    const [page, setPage] = useState(1);
    const [pageSize] = useState(10);
    const [data, setData] = useState<TeacherMessage[]>([]);
    const scrollRef = useRef<HTMLDivElement>(null);
    const [pages, setAllPages] = useState(1)
    const [flag, setFlag] = useState(false)
    const getTeacherApply = useCallback(async () => {
        const messageData = await joinLesson(page, pageSize);
        setData(messageData.data.records);
        setAllPages(messageData.data.pages)
    }, [page]); // 
    const readMessageMethods=(async ()=>{
        const data=await readMessage() as unknown as Responsedata
        if(data.code===20000){
            setRead(0)
        }

    })
    useEffect(() => {
        getTeacherApply();
    }, [getTeacherApply]);
    useEffect(() => {
        readMessageMethods();
    }, []);
    
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
    const argeeNewStudent = ((lessonStuId: number) => {
        confirm({
            title: '加入课程申请',
            content: '确定同意申请吗？',
            okText: '确定',
            okType: 'primary',
            cancelText: '取消',
            async onOk() {
                const argeeData = await aduitStudentApplication(1, lessonStuId) as unknown as Responsedata
                console.log(argeeData);
                if (argeeData.code === 20000) {
                    getTeacherApply()
                }
            },
            onCancel() {
                console.log('Cancel');
            },
        })

    })
    const refuseNewStudent = ((lessonStuId: number) => {
        confirm({
            title: '加入课程申请',
            content: '确定拒绝申请吗？',
            okText: '拒绝',
            okType: 'danger',
            cancelText: '取消',
            async onOk() {
                const refuseData = await aduitStudentApplication(2, lessonStuId) as unknown as Responsedata
                if (refuseData.code === 20000) {
                    getTeacherApply()
                }
            },
            onCancel() {
                console.log('Cancel');
            },
        })

    })
    return { flag, scrollRef, setPage, pageSize, data, refuseNewStudent,teachermessageSroll, argeeNewStudent };
};

export default useTeacherMessage;
