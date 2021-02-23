import React from 'react';
import Header from '../../components/Header/Header';
import AppButton from '../../components/AppButton/AppButton';
import Card from 'react-bootstrap/Card';
import {Link} from 'react-router-dom';
import {logOut} from '../../redux/features/user/userSlice';
import { useDispatch } from "react-redux";


const Home = () => {
const dispatch = useDispatch();

return (
<>
<Header />
<section>
<Card className="mx-auto my-5 card__container">
<Card.Body className="card__details py-5 px-3">
<p>
    This is a timed quiz consisting of 10 questions. You are required to
    complete the quiz within the allocated time before the page time off.
    If you fail to complete the quiz before the allotted time, the quiz will time
    off at the end of the alloted time, thereby ending the quiz abruptly and rendering 
    yoir attempt invalid.
    <br /><br />
    When you are ready, click the start quiz button below to commence the quiz.
    Goodluck!
</p>

<div className="d-flex mx-auto justify-content-around">
<Link to="/quiz">
<AppButton>Start Quiz</AppButton>
</Link>

<div className=".app__btn-container">
<button onClick={() => {dispatch(logOut())}} className="custom__btn">
  Log out
</button>
</div>
</div>

</Card.Body>
</Card>  
</section>        
</>
)
}


export default Home;
