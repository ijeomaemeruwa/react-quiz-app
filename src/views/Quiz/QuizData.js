import React, {useState, useEffect} from 'react';
import axios from 'axios';
import QuizList from './QuizList';

const apiURL = "https://hasquiz-api.herokuapp.com/api/quiz"


const Quiz = () => {
const [data, setData] = useState([]);
const [isLoading, setIsLoading] = useState(false);

//Fetch Questions
useEffect(() => {
  
  try{
    const fetchQuestions = async () => {
    setIsLoading(true)
    const response = await axios.get(apiURL);
    console.log(response);
    const questionsData = response.data.data
    setData(questionsData);
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
<div>
 {
  data.map(({ id, ...otherDataProps }) => (
  <QuizList 
    key={id} 
    setData={setData}
    isLoading={isLoading}
    {...otherDataProps} 
  />
))}
</div> 
</>
)
}

export default Quiz;