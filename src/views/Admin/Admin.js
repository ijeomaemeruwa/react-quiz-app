import React, {useState} from 'react';
import './admin.css';
import axios from 'axios';
import {timeStringToSeconds} from '../../components/utils/timeStringToSeconds';
import Header from '../../components/Header/Header';
import SetTimerModal from '../../components/SetTimerModal/SetTimerModal';
import Card from 'react-bootstrap/Card';
import {logOut} from '../../redux/features/user/userSlice';
import {useDispatch} from "react-redux";
import {AiFillHome} from 'react-icons/ai'
import {BsTrashFill} from 'react-icons/bs'
import {RiTimerFill} from 'react-icons/ri'
import toast, {Toaster} from 'react-hot-toast';


const Admin = () => {
  const dispatch = useDispatch();
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([]);
  const [questionvalue, setQuestionValue] = useState("");
  const [optionsValue, setOptionsValue] = useState("");
  const [radioValue, setRadioValue] = useState("");
  const [timeString, setTimeString] = useState("");
  const [modalShow, setModalShow] = useState(false);


  const handleSubmit = (e) => {
    e.preventDefault();
    const answers = options.map((option) => ({
      answer: option,
      correct: radioValue === option
    }));
    const time = timeStringToSeconds(timeString);
    if (!question) {
      toast.error('Please add a question');
    } else if (options.length < 4) {
      toast.error('Please add 4 options');
    } else if (!radioValue) {
      toast.error('Please select the correct answer');
    } else if(!time) {
      toast.error('Please set a time!')
    }else{
      try{
        const res = axios.post('https://hasquiz-api.herokuapp.com/api/questions',{
          question,
          answers,
          time
        })
        console.log(res);
        toast.success('Question added successfully');
        setQuestionValue("")
        setOptions([])
      }catch(error){
        console.log(error);
        toast.error('Error, try again')
      }
    }
  }


return (
<>
<Header />
<Toaster position="bottom-center" />
<section>
<div className="logout__btn d-flex justify-content-center mx-auto">
  <button onClick={() => {dispatch(logOut())}}>
    Log out
  </button>
</div>

<Card className="mx-auto my-5 card__container">
<Card.Body className="card__details px-3 pt-5">
<div className="admin__input">

<div>
  <p className="pl-3">{question}</p>
<input  
  type="text" 
  value={questionvalue}
  onChange={(e) => setQuestionValue(e.target.value)}
  onKeyUp={(e) => {
    if(e.key === "Enter"){
      e.preventDefault()
      setQuestionValue("")
      setQuestion(questionvalue)
    }
  }}
  className="add_quiz mb-3" 
  placeholder="Input Question" 
/>
</div>

<div>
{
  options.map((option, index) => (
  <span key={index} className="form-check d-flex align-items-center">
  <input 
    type="radio"  
    id="answers" 
    className="form-check-input mb-3 p-3" 
    style={{ width: '30px'}}
    onClick={(e) => setRadioValue(e.target.value)} 
    value={radioValue} 
  />
  <label htmlFor="answers" value ={option} className="pl-3">{option}</label>
  </span>
))
}
</div>

<input 
  placeholder="Add Options"
  type="text"
  value={optionsValue}
  onChange={(e) => setOptionsValue(e.target.value)}
  onKeyUp={(e) => {
    if ((e.key === "Enter") && options.length < 4) {
      e.preventDefault();
      setOptions((prev) => [...prev, optionsValue]);
      setOptionsValue("");
    }
    if ((e.key === "Enter") && options.length === 4) {
      e.preventDefault();
      setOptionsValue("");
      toast('You cannot add more than 4 options');
    }
  }}
/>
</div>


<div className="submit__btn">
<button onClick={handleSubmit}>Submit</button>
</div>
<div className="admin__controls">
  <p>
    <span className="icon"><AiFillHome /></span>
    <span className="tag">All</span>
  </p>
  <p onClick={() => {
    setQuestion(""); 
    setOptions([])}}>
    <span className="icon"><BsTrashFill /></span>
    <span className="tag">Reset</span>
  </p>
  <p onClick={() => setModalShow(true)}>
    <span className="icon"><RiTimerFill /></span>
    <span className="tag">Timer</span>
  </p>
</div>
</Card.Body> 
</Card>

<SetTimerModal 
  onHide={() => setModalShow(false)}
  show={modalShow} 
  timeString={timeString}
  setTimeString={setTimeString}
/>
</section>               
</>
)
}


export default Admin;

