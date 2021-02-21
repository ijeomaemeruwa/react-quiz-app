import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Spinner from 'react-bootstrap/Spinner';
import FormInput from "../../components/FormInput/FormInput";
import AppButton from "../../components/AppButton/AppButton";
import { Link } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { useDispatch } from "react-redux";
// import { history } from '../../redux/features/utils/history';
import { register } from "../../redux/features/user/userSlice";



const validate = values => {
  const errors = {};
  if (!values.firstName) {
    errors.firstName = 'First Name is required';
  } 
  if (!values.lastName) {
    errors.lastName = 'Last Name is required';
  } 
  if (values.password !== values.password_confirmation) {
    errors.password_confirmation = 'Passwords do not match'
  } else if(values.password.length < 6) {
    errors.password = 'Passowrd must be 6 characters or more';
  }
  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  return errors;
};


const Register = (props) => {
const formik = useFormik({
  initialValues: {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    password_confirmation: ''
  },
  validate
})
const [loading, setLoading] = useState(false); 
const dispatch = useDispatch();
 

const handleRegisteration = (e) => {
  e.preventDefault();

  const newUser = {
    firstName: formik.values.firstName,
    lastName: formik.values.lastName,
    email: formik.values.email,
    password: formik.values.password,
    password_confirmation: formik.values.password_confirmation
  }
  setLoading(true);
  const response = dispatch(register(newUser));
  if(response.message) {
    toast.success('Registration successful')
    props.history.push("/login");
    setLoading(false);
  }
  if (response.error) {
    toast.error('Error, try again!')
  }
};

  

return (
<section className="form__section">
<Toaster position="bottom-center" />
<div className="form__container">
<header>
  <p><Link to="/" className="auth_link">Home</Link></p> 
</header>
<div className="form__title text-center p-5">
  <h4>Register</h4>
</div>

<Form className="form mx-auto" onSubmit={handleRegisteration}>
<Form.Row>
<Form.Group as={Col}>
<FormInput
  type="text"
  id="firstName"
  name="firstName"
  value={formik.values.firstName}
  onChange={formik.handleChange}
  placeholder="First Name"
/>
{
 formik.errors.firstName ? 
 <small>{formik.errors.firstName}</small> : null
}
</Form.Group>

<Form.Group as={Col}>
<FormInput
  type="text"
  id="lastName"
  name="lastName"
  value={formik.values.lastName}
  onChange={formik.handleChange}
  placeholder="Last Name"
/>
{
 formik.errors.lastName ? 
 <small>{formik.errors.lastName}</small> : null
}
</Form.Group>
</Form.Row>

<Form.Group>
<FormInput
  type="email"
  id="email"
  name="email"
  value={formik.values.email}
  onBlur={formik.handleBlur}
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

<Form.Group>
  <FormInput
    type="password"
    id="password_confirmation"
    name="password_confirmation"
    value={formik.values.password_confirmation}
    onChange={formik.handleChange}
    placeholder="Confirm Password"
  />
{ 
 formik.errors.password_confirmation ? 
 <small>{formik.errors.password_confirmation}</small> : null
}
</Form.Group>
<br />

<AppButton>
{loading ? 
  (<Spinner animation="border" variant="light" />) : 
  (<span>Register</span>)
}
</AppButton>
<br />
<AppButton facebook__btn>Register with Facebook</AppButton>

<p>
  Already have an account?
  <Link to="/login" className="auth_link">Log in</Link>
</p>
</Form>
</div>
</section>
  );
};



export default Register;
