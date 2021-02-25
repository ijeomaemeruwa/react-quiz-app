import React, {useState, useEffect} from 'react';
import { InputGroup } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';

// value={quiz.answer} 
  // onChange={() => {setAnswers({
  //     questionId: quiz.questionId, 
  //     selectedAnswer: quiz.id
  //   })}


const QuizList = ({ question, setAnswers, userAnswers }) => {
  const [radioValue, setRadioValue] = useState("");


  useEffect(() => {
      const currentAnswer = userAnswers.find((answer) => answer.questionId === question.id);
      if (currentAnswer) {
        const selectedAnswer = question.answers.find((answer) => answer.id === currentAnswer.selectedAnswer
        );
      if (selectedAnswer) setRadioValue(selectedAnswer.answer);
      }
  }, [question, userAnswers]);

return (
<div>
<Card className="card__container mx-auto mb-3">
<Card.Body className="card__details">
<h5>{question.question}</h5>


<InputGroup className="d-flex flex-column">
{
  question.answers.map(quiz => (
  <div key={quiz.id} >
  <label htmlFor={quiz.answer} className="pl-2">
  <input 
    className="mr-2"
    type="radio" 
    id={quiz.answer}
    onClick={() => setAnswers({
      questionId: quiz.questionId,
      selectedAnswer: quiz.id
      })}
    value={radioValue}
  />
  {quiz.answer}
  </label> 
  </div>
  ))
}
</InputGroup>
</Card.Body>
</Card>  
</div>
)
}

export default QuizList;
