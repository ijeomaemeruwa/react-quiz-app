import React, {useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import Questions from './Questions';
import axios from 'axios';
import SubmitQuiz from '../../components/SubmitQuiz/SubmitQuiz';
import Pagination from '../../components/Pagination/Pagination';
import Timer from '../../components/Timer/Timer';
import {logOut} from '../../redux/features/user/userSlice';
import { useDispatch } from "react-redux";
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
import Swal from 'sweetalert2';
import toast, { Toaster } from 'react-hot-toast';


const QuizList = ({ 
  questions, 
  totalTime, 
  totalQuestions, 
  setData, 
  isLoading, 
  history 
  }) => {

 const dispatch = useDispatch();
 const [submitting, setSubmitting] = useState(false);
 const [currentPage, setCurrentPage] = useState(1)
 const [currentQuestions, setCurrentQuestions] = useState([])
 const [quizAnswers, setQuizAnswers] = useState([])
 const questionsPerPage = 5
 const totalPages = questions && Math.ceil(questions.length / questionsPerPage);


// Save Questions to LocalStorage
useEffect(() => {
  const questionsList = JSON.stringify(questions);
  localStorage.setItem('questions', questionsList)
}, [questions]);

// useEffect(() => {
//   const storedQuestions = JSON.parse(localStorage.getItem('questions'));
//   if (storedQuestions) setCurrentQuestions(storedQuestions);
// }, [setCurrentQuestions]);



//Pagination
 useEffect(() => {
   const indexOfLastQuestion = currentPage * questionsPerPage
   const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage

   if(questions) {
    setCurrentQuestions(questions.slice(indexOfFirstQuestion, indexOfLastQuestion))
   }
   window.scrollTo(0, 0)
 }, [currentPage, questions]);


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
    submitting(true);
    const res = await axios.post('https://hasquiz-api.herokuapp.com/api/submit', 
    {
      quizAnswers,
      quizId: questions[0].quizId
    })
    const correctAnsCount = res
    Swal.fire({
      icon: 'success',
      title: 'Quiz Completed!',
      text: `You scored ${correctAnsCount} out of ${totalQuestions}`,
      // backdrop: rgba()
    })
    setSubmitting(false);
    history.push('/start');
  }catch(error){
    console.log(error)
    toast.error('Error, try again!')
    setSubmitting(false);
  }
}

const submit = () => {
  if(quizAnswers.length < totalQuestions) {  
    toast.error('Please answer all questions')
  } else{
    submitForm();
  } 
}

 
return (
<>
<main>
<Toaster 
  position="bottom-center"
/>
<Header />
<section>
<div className="d-flex justify-content-around mx-auto mb-3 px-3 align-items-center">
<div>
  {currentQuestions.length > 0 && totalTime && (
    <Timer totalTime={totalTime} submit={submit} />
  )}
</div>
<div className="logout__btn">
  <button onClick={() => {dispatch(logOut())}}>Log out</button>
</div>
</div>

<div className="d-flex mx-auto my-3 justify-content-center">
{
  (isLoading || currentQuestions.length === 0)  && (
  <Spinner animation="border" variant="secondary" />
)}
</div>

<Form>
<div>
{
 currentQuestions.map(question => (
 <Questions 
  key={question.id}
  question={question}
  setCurrentAnswer={setCurrentAnswer}
  quizAnswers={quizAnswers}
 />
))
} 
</div>

<SubmitQuiz 
  submit={submit}
  submitting={submitting}
/>
</Form>

<Pagination 
   currentPage={currentPage}
   totalPages={totalPages}
   handlePrev={handlePrev}
   handleNext={handleNext}
 />
</section>
</main>
</>
)
}

export default QuizList;