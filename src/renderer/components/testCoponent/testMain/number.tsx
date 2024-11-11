import { Button } from "antd";

const QuestionNumbers = ({ questions, currentQuestionId, onSelect }) => {
    console.log(currentQuestionId, questions);

    return (
        <div className="flex flex-wrap gap-2 mt-4">
            {questions.map((q) => (
                <Button
                    key={q.id}
                    type={currentQuestionId === q.id ? 'primary' : 'default'}
                    onClick={() => onSelect(q.id)} // 传递索引而不是题目对象
                    className="w-10 h-10"
                >
                    {q.id}
                </Button>
            ))}
        </div>
    )
}

export default QuestionNumbers;
