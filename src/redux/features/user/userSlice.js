import { createSlice } from "@reduxjs/toolkit";
import {history} from '../utils/history';
import {setAuthToken} from '../utils/setAuthToken';
import axios from 'axios';


const userSlice = createSlice({
    name: "user",
    initialState: {
      isAuthenticated: false,
      role: ""
    },
    reducers: {
    setCurrentUser(state, action) {
    if (action.payload) {
        state.isAuthenticated = true;
    } else {
        state.isAuthenticated = false;
    }
    state.role = action.payload;
    },
    }
})


export const register = (user) => async () => {
  try {
    const res = await axios.post(
      "https://hasquiz-api.herokuapp.com/api/auth/register",
      user
    );
    if (res.data.message === "User successfully registered")
    return { message: res.data.message };
  } catch (error) {
    if (error.response.data.email.length > 0) {
      return { error: error.response.data.email[0] };
    }
  }
};


export const login = (user) => async(dispatch) => {
  try {
    const res = await axios.post(
      "https://hasquiz-api.herokuapp.com/api/auth/login",
      user
    );
    const token = res.data.data.accessToken;
    localStorage.setItem("jwtToken", token);
    setAuthToken(token);
    const role = res.data.data.user.role;
    localStorage.setItem("role", role);
    if (role === "Admin") {
      dispatch(setCurrentUser(role));
      history.push("/admin");
    }
    if (role === "User") {
      dispatch(setCurrentUser(role));
      history.push("/start");
    }
  } catch (error) {
    console.log(error.message);
    if (error.response.status === 401) {
      return { error: error.message };
    }
  }
};


export const logOut = () => (dispatch) => {
  localStorage.removeItem("jwtToken");
  localStorage.removeItem("role");
  setAuthToken("");
  dispatch(setCurrentUser(""));
  history.push("/login");
};

  
export const { setCurrentUser } = userSlice.actions;
export default userSlice.reducer;



