import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import {history} from '../../redux/features/utils/history';
import {fetchQuizData} from '../../redux/features/quiz/quizSlice';
import Header from '../../components/Header/Header';
// import SubmitQuiz from '../../components/SubmitQuiz/SubmitQuiz';
import Timer from '../../components/Timer/Timer';
import QuizList from './QuizList';
import Spinner from 'react-bootstrap/Spinner';
import Swal from 'sweetalert2';
import toast, { Toaster } from 'react-hot-toast';


const Quiz = () => {
const { quizData, loading } = useSelector(state => state.quiz);
const dispatch = useDispatch();
const [userAnswers, setUserAnswers] = useState([]);
const [submitting, setSubmitting] = useState(false);


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
  const answer = userAnswers.find(
    userAnswer => userAnswer.questionId === currentAnswer.questionId
  );
  if (answer) {
    setUserAnswers(prevUserAnswers =>
      prevUserAnswers.map(prevUserAnswer =>
      prevUserAnswer.questionId === currentAnswer.questionId
        ? {
            ...prevUserAnswer,
            selectedAnswer: currentAnswer.selectedAnswer,
          }
        : prevUserAnswer
      )
    );
  } else {
    setUserAnswers(prevUserAnswers => [...prevUserAnswers, currentAnswer]);
  }
};


const handleSubmit = async (e) => {
  e.preventDefault();
  setSubmitting(true)
  try{
    const response = await axios.post('https://hasquiz-api.herokuapp.com/api/submit', 
    { userAnswers, quizId: quizData.questions[0].quizId })
    console.log(response);
    const { correctCount } = response.data.meta;
    history.push("/start");
    setSubmitting(false)
    Swal.fire({
    icon: 'success',
    title: 'Quiz Completed!',
    text: `You scored ${correctCount} out of ${quizData.totalQuestions}`,
    footer: '<a href="/start">Restart Quiz</a>'
    })
  } catch(error) {
    console.log(error)
    toast.error('An error occurred')
    setSubmitting(false)
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
<form onSubmit={handleSubmit}>
<div className="d-flex justify-content-around mx-auto mb-3 px-4 align-items-center">
 {quizData.questions.length > 0 && quizData.totalTime && (
    <Timer totalTime={quizData.totalTime} submit={handleSubmit} />
  )}
<div className="submitquiz__btn">
 <button>
   {
     submitting ?  (<Spinner animation="border" variant="light" />) :
     (<span>Submit</span>)
   }
 </button>  
</div>
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
</form>
</section>)
}
</>
)
}

export default Quiz;
