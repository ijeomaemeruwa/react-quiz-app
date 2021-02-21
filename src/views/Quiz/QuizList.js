import React, {useState, useEffect } from 'react';
import Questions from './Questions';
import axios from 'axios';
import SubmitQuiz from '../../components/SubmitQuiz/SubmitQuiz';
// import Swal from 'sweetalert2'


// const Swal = require('sweetalert2')


const QuizList = ({ question }) => {
 const [currentPage, setCurrentPage] = useState(1)
 const [currentQuestions, setCurrentQuestions] = useState([])
 const [quizAnswers, setQuizAnswers] = useState([])
 const questionsPerPage = 5
 const totalPages = question && Math.ceil(question.length / questionsPerPage);


//Pagination
 useEffect(() => {
   const indexOfLastQuestion = currentPage * questionsPerPage
   const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage

   if(question) {
     setCurrentQuestions(question.slice(indexOfFirstQuestion, indexOfLastQuestion))
   }
   window.scrollTo(0, 0)
 }, [currentPage, question]);


 const handleNext = () => {
   setCurrentPage(prev => prev + 1);
 }
 const handlePrev = () => {
   setCurrentPage(prev => prev - 1);
 }


 const setCurrentAnswer = (currentAnswer) => {
   const userAnswers = quizAnswers.find(answer => answer.questionId === currentAnswer.questionId);

   if(userAnswers){
     setQuizAnswers(prevAnswers => {
       prevAnswers.map(prevAnswer => (
         prevAnswer.questionId === currentAnswer.questionId ?
         {...prevAnswer, selected: currentAnswer.selected} :
         prevAnswer
       ))
     })
   }else {
     setQuizAnswers(prevAnswers => [...prevAnswers, currentAnswer]);
   }
 }

 const submitForm = async () => {
   try{
     const res = await axios.post('https://hasquiz-api.herokuapp.com/api/submit', 
     {
       quizAnswers,
       quizId: question[0].quizId
     })
     const correctAnsCount = res
     //Insert Modal here
   }catch(error){
     console.log(error)
     //toast.error()
   }
 }

 const submit = () => {
   if(quizAnswers.length < 18){  //totalquestion
     //toast.error()
   }else{
     submitForm();
   } 
 }

 
return (
<>
<section>
<div>
{
 currentQuestions.map(quiz => (
 <Questions 
  key={quiz.id}
  quiz={quiz}
  setCurrentAnswer={setCurrentAnswer}
  quizAnswers={quizAnswers}
 />
))
} 
</div>

<div>
<SubmitQuiz 
  submit={submit}
/>

<footer>
<div className="d-flex justify-content-around mx-auto align-items-center px-2">
<div className="pages">
<p>Page {currentPage} of {totalPages}</p>
</div>

<div className="d-flex align-items-center pagination">
  {currentPage > 1 && (
    <p onClick={handlePrev} className="prev">Prev</p>
  )}
  {currentPage !== totalPages && (
    <p onClick={handleNext}>Next</p>
  )}
</div>
</div>
</footer>          
</div>
</section>
</>
)
}

export default QuizList;
