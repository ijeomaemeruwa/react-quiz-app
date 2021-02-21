import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import FormInput from '../../components/FormInput/FormInput';
import AppButton from '../../components/AppButton/AppButton';
import {Link} from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { useDispatch } from "react-redux";
import { login } from "../../redux/features/user/userSlice";


const validate = values => {
  const errors = {};
  if(values.password.length < 6) {
    errors.password = 'Passowrd must be 6 characters or more';
  }
  if (!values.email) {
    errors.email = 'Email is required';
  }
  return errors;
}


const Login = (props) => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validate
  })
const [loading, setLoading] = useState(false);
const dispatch = useDispatch();


const handleLogin = (e) => {
  e.preventDefault();
  const loginDetails = {
    email: formik.values.email, 
    password: formik.values.password 
  }
  setLoading(true);
  const response = dispatch(login(loginDetails));
  if(response.error) {
    toast.error('Error, please register or check input')
    setLoading(false);
  }
}


return (
<>
<section className="form__section">
<Toaster 
  position="bottom-center"
/>
<div className="form__container">
<header>
  <p><Link to="/" className="auth_link">Home</Link></p>
</header>
<div className="form__title text-center p-5">
<h4>Log in</h4>
</div>

<Form className="form mx-auto" onSubmit={handleLogin}>
<Form.Group>
<FormInput 
    type="email"
    id="email"  
    name="email"
    value={formik.values.email}
    onChange={formik.handleChange} 
    placeholder="Email Address"
/>
{
 formik.errors.email ? 
 <small>{formik.errors.email}</small> : null
}
</Form.Group>

<Form.Group>
<FormInput 
  type="password" 
  id="password"
  name="password"
  value={formik.values.password}
  onChange={formik.handleChange}  
  placeholder="Password" 
/>
{
 formik.errors.password ? 
 <small>{formik.errors.password}</small> : null
}
</Form.Group>
<br />
<div>
<AppButton>
{ loading ? 
  (<Spinner animation="border" variant="light" />) : 
  (<span>Log in</span>)
}
</AppButton>
</div>
<p>
 Don't have an account? 
 <Link to="/register" className="auth_link">Register</Link>
</p>
</Form>
</div>      
</section>  
</>
)
}

export default Login;
