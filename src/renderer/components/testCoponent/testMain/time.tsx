import { ClockCircleOutlined } from "@ant-design/icons";
import { setPaperIdnow } from "@renderer/store/reducers/paper";
import { message, Modal } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";


// 倒计时组件
const CountdownTimer = ({ summbit, time }) => {
    const dispatch = useDispatch();
    const [timeLeft, setTimeLeft] = useState(time * 60); // 将分钟转换为秒
    const [warning, setWarning] = useState(false);
    const [end, setEnd] = useState(false);
    const [isFirstRender, setIsFirstRender] = useState(true); // 新增状态
    const navigate=useNavigate()
    useEffect(() => {
        setTimeLeft(time * 60);
        setIsFirstRender(false); // 设置为非首次渲染
    }, [time]);

    useEffect(() => {
        if (timeLeft <= 0) return;
        if (timeLeft === 0) {
            setEnd(true);
        }

        const timer = setInterval(() => {
            setTimeLeft(prevTime => prevTime - 1);
        }, 1000);

        return () => {
            clearInterval(timer);
            dispatch(setPaperIdnow(0));
        };
    }, [timeLeft, dispatch]);

    useEffect(() => {
        if (timeLeft === 600 && !warning) {
            setWarning(true);
        }
    }, [timeLeft, warning]);

    useEffect(() => {
        if (warning && !isFirstRender) {
            console.log('6666');
            message.info('考试即将结束,请及时提交');
        }
    }, [warning, isFirstRender]);

    useEffect(() => {
        if (end && !isFirstRender) {
            dispatch(setPaperIdnow(0));
            message.success('考试已结束,已为你提交试卷');
            summbit();
            navigate('/testMain');
        }
    }, [end, dispatch]);

    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    return (
        <div className="text-right mb-4">
            <p><strong>
                <ClockCircleOutlined />
                剩余时间：{formatTime(timeLeft)}
            </strong></p>
        </div>
    );
};

export default CountdownTimer;
