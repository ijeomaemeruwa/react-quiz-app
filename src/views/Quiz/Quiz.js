import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Header from '../../components/Header/Header';
import QuizList from './QuizList';
import {logOut} from '../../redux/features/user/userSlice';
import { useDispatch } from "react-redux";
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';


const apiURL = "https://hasquiz-api.herokuapp.com/api/quiz"


const Quiz = () => {
const dispatch = useDispatch();
const [questions, setQuestions] = useState([]);
const [isLoading, setIsLoading] = useState(false);


//Fetch Questions
useEffect(() => {
  setIsLoading(true)
  try{
    const fetchQuestions = async () => {
    const response = await axios.get(apiURL);
    console.log(response);
    const quizData = response.data.data
    setQuestions(quizData);
    setIsLoading(false);
    }
  fetchQuestions()
  } catch(error) {
    console.log(error);
    setIsLoading(false);
  }
  }, []);

  

return (
<>
<Header />
<section>
<div className="d-flex justify-content-around mx-auto mb-3 px-3 align-items-center">
<div>
  <h5>Timer</h5>
</div>
<div className="logout__btn">
  <button onClick={() => {dispatch(logOut())}}>Log out</button>
</div>
</div>

<Form>
  <div className="d-flex mx-auto justify-content-center">
  {isLoading && questions.length === 0 && (
    <Spinner animation="border" variant="secondary" />
  )}
  </div>
{
  questions.length > 1 &&
  questions.map(quiz => (
  <QuizList 
    key={quiz.id} 
    question={quiz.questions} 
    setQuestions={setQuestions}
  />
))}
</Form> 
</section>
</>
)
}

export default Quiz;