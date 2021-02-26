import React from 'react';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import FormInput from '../../components/FormInput/FormInput';
import AppButton from '../../components/AppButton/AppButton';
import {Link} from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/features/user/userSlice";
// import {history} from "../../redux/features/utils/history";


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

const {loading} = useSelector(state => state.user)
const dispatch = useDispatch();
// const history = useHistory()


const handleLogin = (e) => {
  e.preventDefault();
  try{
    const response = dispatch(login({
      email: formik.values.email, 
      password: formik.values.password 
    }));
    console.log(response)
      toast.success('Successfully logged in!')
      props.history.push("/start")
      
  }catch(error) {
    console.log({ ...error });
    if(error.status === 422){
      toast.error('Fields must not be empty')
    }
    if(error.error === "Unauthorized") {
      toast.error('Email or password incorrect!')
    }
  }
}



return (
<>
<section className="form__section">
<Toaster position="bottom-center" />
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
{ loading === true ?
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
