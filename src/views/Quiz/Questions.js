import React, {useState, useEffect} from 'react';
import Card from 'react-bootstrap/Card';
import { useSelector } from "react-redux";


const Questions = ({ question, setCurrentAnswer, quizAnswers }) => {

const { isAuthenticated, role } = useSelector((state) => state.user);

const findCorrectAnswer = question.answers.find((answer) => answer.correct === true);
const correctAnswer = findCorrectAnswer.answer;

const [radioValue, setRadioValue] = useState(" " | isAuthenticated && role === "Admin" ? correctAnswer : "")
  
useEffect(() => {
if (isAuthenticated && role === "User") {
    const currentAnswer = quizAnswers.find((answer) => answer.questionId === question.id);
    if (currentAnswer) {
    const selectedAnswer = question.answers.find((answer) => answer.id === currentAnswer.selectedAnswer);
    if (selectedAnswer) setRadioValue(selectedAnswer.answer);
    }
}
}, [question, quizAnswers, isAuthenticated, role]);



return (
<>
<Card className="card__container mb-5 mx-auto">
<Card.Body className="card__details">
<h5>{question.question}</h5>
<div 
// onChange={isAuthenticated && role === "User" ? 
//     (value) => setRadioValue(value)
//     : undefined}
//     value={radioValue}
 >
{
 question.answers.map(answer => (
 <div key={answer.id}>
  <input 
    className="form-check-input" 
    id="answer" 
    type="radio" 
    value={answer.answer} 
    onChange={isAuthenticated && role === "User" ? (e) => {
        setCurrentAnswer({
            questionId: answer.questionId,
            selectedAnswer: answer.id
        });
        }
        : undefined
    }
  />
  <label htmlFor="answer">{answer.answer}</label>
  </div>
 ))}
</div>
</Card.Body>
</Card>  
</>
)
}

export default Questions;