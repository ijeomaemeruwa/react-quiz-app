import React from 'react';
import './appbutton.css';

const AppButton = ({ children, facebook__btn, otherBtnProps }) => {
return (
<div className="app__btn-container">
    <button className= { 
        `${facebook__btn ? 'facebook__btn': ''} 
        custom__btn`
    } 
    {...otherBtnProps}
    >
        {children}   
    </button>     
</div> 
)
}


export default AppButton;
