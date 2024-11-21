import { CheckOutlined } from "@ant-design/icons";
import { Button } from "antd";
import "@renderer/assets/styles/test/index.scss";
const QuestionNumbers = ({ questions, currentQuestionId, onSelect, id = true }) => {
    console.log(questions, '222222222');

    return (
        <div className="flex flex-wrap gap-2 mt-4">
            {questions.map((q) => (
                <>
                    <div className="checkout">
                        <Button
                            key={q.id}
                            type={(id ? currentQuestionId === q.id : currentQuestionId === q.index) ? 'primary' : 'default'}
                            onClick={() => {
                                if (id) {
                                    onSelect(q.id)
                                } else {
                                    onSelect(q.index)

                                }
                            }}
                            className="w-10 h-10"
                        >
                            {id ? q.id : q.index}
                        </Button>
                        {
                            questions.answered == 1 ?
                                <>
                                    < div className="checkoutIcon">
                                        <CheckOutlined />
                                    </div>
                                </> : null

                        }
                    </div >

                </>
            ))
            }
        </div >
    )
}

export default QuestionNumbers;
