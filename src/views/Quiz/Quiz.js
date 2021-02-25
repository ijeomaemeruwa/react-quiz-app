import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {history} from '../../redux/features/utils/history';
import {fetchQuizData, submitQuizData} from '../../redux/features/quiz/quizSlice';
import Header from '../../components/Header/Header';
import SubmitQuiz from '../../components/SubmitQuiz/SubmitQuiz';
import Timer from '../../components/Timer/Timer';
import QuizList from './QuizList';
import Spinner from 'react-bootstrap/Spinner';
import Swal from 'sweetalert2';
import toast, { Toaster } from 'react-hot-toast';


const Quiz = () => {
const { quizData, loading } = useSelector(state => state.quiz);
const dispatch = useDispatch();
const [userAnswers, setUserAnswers] = useState([]);


useEffect(() => (
  dispatch(fetchQuizData())
), [dispatch])


//Save questions to local storage
useEffect(() => {
  const questionsList = JSON.stringify(quizData.questions);
  localStorage.setItem('questions', questionsList)
}, [quizData.questions]);


//Get user answers
const setAnswers = (currentAnswer) => {
    const getAnswer = userAnswers.find(userAnswer => userAnswer.questionId === currentAnswer.questionId);
    if(getAnswer) {
      setUserAnswers(prevAnswers => (
        prevAnswers.map(prevAnswer => (
        prevAnswer.questionId === currentAnswer.questionId ?
        {
          ...prevAnswer,
          selectedAnswer: currentAnswer.selectedAnswer,
        }
        : prevAnswer
        ))
      ))
    } else {
      setUserAnswers(prevAnswers => [...prevAnswers, currentAnswer]);
    }
};


const handleSubmit = (e) => {
  e.preventDefault();
  try{
    const res = dispatch(submitQuizData({ userAnswers, quizId: quizData.questions[0].quizId }))
    const correctAnswers = res.payload
    Swal.fire({
    icon: 'success',
    title: 'Quiz Completed!',
    text: `You scored ${correctAnswers} out of ${quizData.totalQuestions}`,
    })
    history.push("/start")
  } catch(error) {
    console.log(error)
    toast.error('An error occurred')
  }
}

// const checkSubmit = () => {
//     if (userAnswers.length < quizData.totalQuestions) {
//       toast.error( "Please answer all questions before submitting")
//     } else {
//       handleSubmit()
//     }
//   };



return (
<>
<Header />
<Toaster position="bottom-center" />
{
 loading ? 
 (<span className="d-flex justify-content-center mx-auto">
 <Spinner animation="border" variant="dark" />
 </span>) :

(<section>
<div className="d-flex justify-content-around mx-auto mb-3 px-4 align-items-center">
 {quizData.questions.length > 0 && quizData.totalTime && (
    <Timer totalTime={quizData.totalTime} submit={handleSubmit} />
  )}
 <span>
 <SubmitQuiz handleSubmit={handleSubmit} />   
 </span>
</div>

<div>
{quizData.questions.map(question => (
 <QuizList 
  key={question.id}
  question={question}
  setAnswers={setAnswers}
  userAnswers={userAnswers}
/>
))}
</div>
</section>)
}
</>
)
}

export default Quiz;
