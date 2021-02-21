import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import { Provider } from 'react-redux'
import {store} from './redux/store';
import {Router} from 'react-router-dom';
import {history} from './redux/features/utils/history';
import { setAuthToken } from "./redux/features/utils/setAuthToken";
import { setCurrentUser } from "./redux/features/user/userSlice";


if (localStorage.jwtToken && localStorage.role) {
  setAuthToken(localStorage.jwtToken);
  store.dispatch(setCurrentUser(localStorage.role));
}


ReactDOM.render(
  <Provider store={store}>
  <Router history={history}>
    <App />
  </Router>
  </Provider>,
  document.getElementById('root')
);


