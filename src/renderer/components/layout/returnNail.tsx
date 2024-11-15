import { LeftOutlined } from "@ant-design/icons";
import { Button } from "antd";
import "@renderer/assets/styles/test/index.scss"
import { useNavigate } from 'react-router-dom';
const ReturnNailbar = (props) => {
    const { children } = props
    const navigate = useNavigate()
    const gotoBack = (() => {
        navigate(-1)

    })
    return (
        <div className="returnMain">
            <Button icon={<LeftOutlined />} type="dashed" onClick={gotoBack}>返回</Button>
            <div>
                {children}
            </div>
        </div>
    )
}
export default ReturnNailbar;