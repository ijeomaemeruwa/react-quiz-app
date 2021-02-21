import React from 'react';
import './forminput.css';


const FormInput = ({ ...otherInputProps }) => {
    return (
    <div>
    <input className="auth__input" {...otherInputProps} />
    </div>
    )
}

export default FormInput;
