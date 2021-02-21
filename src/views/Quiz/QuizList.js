import React, {useState, useEffect } from 'react';
import Questions from './Questions';
import axios from 'axios';
import SubmitQuiz from '../../components/SubmitQuiz/SubmitQuiz';
import Swal from 'sweetalert2';
import toast, { Toaster } from 'react-hot-toast';


const QuizList = ({ question, setQuestions, history }) => {
 const [currentPage, setCurrentPage] = useState(1)
 const [currentQuestions, setCurrentQuestions] = useState([])
 const [quizAnswers, setQuizAnswers] = useState([])
 const questionsPerPage = 5
 const totalPages = question && Math.ceil(question.length / questionsPerPage);
 const [loading, setLoading] = useState(false);


// Save Questions to LocalStorage
useEffect(() => {
  const storedQuestions = JSON.parse(localStorage.getItem('questions'));
  if (storedQuestions) setQuestions(storedQuestions);
}, [setQuestions]);

useEffect(() => {
  const questionList = JSON.stringify(question);
  localStorage.setItem('questions', questionList)
}, [question]);


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
    setLoading(true);
    const res = await axios.post('https://hasquiz-api.herokuapp.com/api/submit', 
    {
      quizAnswers,
      quizId: question[0].quizId
    })
    const correctAnsCount = res
    Swal.fire({
      icon: 'success',
      title: 'Quiz Completed!',
      text: `You scored ${correctAnsCount} out of 18`,
      // backdrop: rgba()
    })
    setLoading(false);
    history.push('/start');
  }catch(error){
    console.log(error)
    toast.error('Error, try again!')
    setLoading(false);
  }
}

const submit = () => {
  if(quizAnswers.length < 18){  //totalquestion
    toast.error('Please answer all questions')
  } else{
    submitForm();
  } 
}

 
return (
<>
<section>
<Toaster 
  position="bottom-center"
/>
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
  loading={loading}
/>

<footer>
<div className="d-flex justify-content-around mx-auto align-items-center px-2">
<div className="pages">
<p>Page {currentPage} of {totalPages}</p>
</div>

<div className="d-flex align-items-center pagination">
  {currentPage > 1 && (
    <p onClick={handlePrev} className="prev pr-2">Prev</p>
  )}
  {currentPage !== totalPages && (
    <p onClick={handleNext} className="next">Next</p>
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
