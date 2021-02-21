import React from 'react';
import { useSelector } from "react-redux";
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {Redirect} from 'react-router-dom';
import Register from './views/Register/Register';
import Login from './views/Login/Login';
import Home from './views/Home/Home';
import Start from './views/Start/Start';
import Quiz from './views/Quiz/Quiz';
import Admin from './views/Admin/Admin';


const App = () => {
  const { isAuthenticated, role } = useSelector((state) => state.user);

return (
<>
<Router>
<Switch>
  <Route exact path="/"><Home /></Route>

  <Route exact path="/register">
   {isAuthenticated ? <Redirect to="/" /> : <Register />}
  </Route>

  <Route exact path="/login">
   {isAuthenticated && role === "User" ? <Redirect to="/start" /> : <Login />}
  </Route>

  <Route exact path="/start">
  {isAuthenticated && role === "User" ? 
    (<Start />) : 
    isAuthenticated && role === "Admin" ? 
    (<Redirect to="/" />) : 
    (<Redirect to="/login" />)}
  </Route>

  <Route exact path="/quiz">
  {
    isAuthenticated && role === "User" ? 
    (<Quiz />) : 
    isAuthenticated && role === "Admin" ? 
    (<Redirect to="/admin" />) : 
    (<Redirect to="/" />)
  }
  </Route>
  <Route exact path="/admin">
  {
   isAuthenticated && role === "Admin" ? 
   (<Admin />) : 
   (<Redirect to="/" />)
  }
  </Route>
</Switch>   
</Router>
</>
  );
}

export default App;
