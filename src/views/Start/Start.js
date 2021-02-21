import React from 'react';
import Header from '../../components/Header/Header';
import AppButton from '../../components/AppButton/AppButton';
import Card from 'react-bootstrap/Card';
import {Link} from 'react-router-dom';


const Home = () => {
return (
<>
<Header />
<section>
<Card className="mx-auto my-5 card__container">
<Card.Body className="card__details py-5 px-3">
<p>
    This is a timed quiz consisting of 10 questions. You are required to
    complete the quiz within 10 minutes before the page time off.
    If you fail to complete the quiz before the allotted time, the quiz will time
    off at the end of the alloted time, thereby ending the quiz abruptly and rendering 
    yoir attempt invalid.
    <br /><br />
    When you are ready, click the start quiz button below to commence the quiz.
    Goodluck!
</p>

<div>
<Link to="/quiz">
<AppButton>Start Quiz</AppButton>
</Link>
</div>

</Card.Body>
</Card>  
</section>        
</>
)
}


export default Home;
