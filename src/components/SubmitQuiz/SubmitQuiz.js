import React from 'react';
import './submitquiz.css';
import Spinner from 'react-bootstrap/Spinner';

const SubmitQuiz = ({ handleSubmit, loading }) => {
return (
<div className="submitquiz__btn">
 <button onClick={handleSubmit}>
 { loading ? 
  (<Spinner animation="border" variant="light" />) : 
  (<span>Submit</span>)
 }
 </button>  
</div>
)
}

export default SubmitQuiz;
