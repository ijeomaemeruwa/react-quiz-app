import React, {useEffect} from 'react';
import { useDispatch } from 'react-redux';
import Header from '../../components/Header/Header';
import { fetchQuizData } from '../../redux/features/quiz/quizSlice';
// import QuizList from './QuizList';
import Form from 'react-bootstrap/Form';


const Quiz = () => {
const dispatch = useDispatch();


useEffect(() => {
const fetchData = dispatch(fetchQuizData());
console.log(fetchData)

}, [dispatch]);


return (
<>
<Header />
<Form>


</Form>
</>
)
}

export default Quiz;
