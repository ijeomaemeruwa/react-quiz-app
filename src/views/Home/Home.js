import React from 'react'
import Header from '../../components/Header/Header';
import './home.css';
import {Link} from 'react-router-dom';


const Home = () => {
return (
<>
<Header />
<div className="home__btn d-flex justify-content-center mx-auto">
    <Link to="/login">
    <button>Log in</button> 
    </Link> 
</div> 
</>
)
}


export default Home;
