import React from 'react';
import './submitquiz.css';

const SubmitQuiz = ({ submit }) => {
return (
<div className="submitquiz__btn d-flex justify-content-center mx-auto mb-5">
 <button onClick={submit}>
    Submit
 </button>  
</div>
)
}

export default SubmitQuiz;
