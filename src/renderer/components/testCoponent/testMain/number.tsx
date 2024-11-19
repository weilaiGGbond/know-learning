import { Button } from "antd";

const QuestionNumbers = ({ questions, currentQuestionId, onSelect, id = true }) => {
    console.log(questions);

    return (
        <div className="flex flex-wrap gap-2 mt-4">

            {questions.map((q) => (
                <Button
                    key={q.id}
                    type={currentQuestionId === q.id ? 'primary' : 'default'}
                    onClick={() => onSelect(q.id)}
                    className="w-10 h-10"
                >
                    {
                        id == true ? q.id : q.index
                    }
                </Button>
            ))}
        </div>
    )
}

export default QuestionNumbers;
