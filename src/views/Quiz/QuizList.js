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

  const handleChange = (e) => {
    setRadioValue(e.target.value)
  }

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
  question.answers.map(answer => (
  <div key={answer.id} >
  <label 
    htmlFor={answer.id} 
    className="pl-2"
    value={answer.answer} 
    onChange={() => setAnswers({
      questionId: answer.questionId,
      selectedAnswer: answer.id
    })}>
  <input 
    className="mr-2"
    type="radio" 
    id={answer.id}
    name={answer.questionId}
    onChange={handleChange}
    value={radioValue}
  />
  {answer.answer}
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
