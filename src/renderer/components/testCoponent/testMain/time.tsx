import { ClockCircleOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";

// 倒计时组件
const CountdownTimer = ({ duration }) => {
    const [timeLeft, setTimeLeft] = useState(duration);

    useEffect(() => {
        if (timeLeft <= 0) return;

        const timer = setInterval(() => {
            setTimeLeft(prevTime => prevTime - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft]);

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
            </strong>
            </p>
        </div>
    );
};
export default CountdownTimer 