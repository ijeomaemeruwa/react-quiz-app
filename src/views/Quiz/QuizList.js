import React from 'react';
import Card from 'react-bootstrap/Card';

const QuizList = ({ question }) => {
return (
<div>
<Card>
<Card.Body>
    <h5>{question.question}</h5>
</Card.Body>
</Card>  
</div>
)
}

export default QuizList
