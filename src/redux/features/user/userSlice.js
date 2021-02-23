import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {history} from '../utils/history';
import {setAuthToken} from '../utils/setAuthToken';
import axios from 'axios';

// const User = {
//   email: "",
//   password: ""
// }

// const newUser = {
//   firstName: "",
//   lastName: "",
//   email: "",
//   password: "",
//   password_confirmation: ""
// }


export const register = createAsyncThunk(
  "user/register",
  async (user) => {
    try {
      const res = await axios.post(
        "https://hasquiz-api.herokuapp.com/api/auth/register",
         user
      );
      if (res.data.message === "User successfully registered")
      return { message: res.data.message };
      history.push("/login");
    } catch (error) {
      return { error: error.data.message };
    }
  } 
)


export const login = createAsyncThunk(
"user/login",
  async(user) => {
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
      history.push("/admin");
      }
    if (role === "User") {
      history.push("/start");
    }
  } catch (error) {
  console.log(error.message)
    return { error: error.message };
  }
}
)


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
    },
    extraReducers: {
      [register.fulfilled]: (state) => {
        state.isAuthenticated = true;
      },
      [register.rejected]: (state) => {
        state.isAuthenticated = false;
      },
      [login.fulfilled]: (state) => {
        state.isAuthenticated = true;
      },
      [login.rejected]: (state) => {
        state.isAuthenticated = false;
      }
      }
})


export const logOut = () => (dispatch) => {
  localStorage.removeItem("jwtToken");
  localStorage.removeItem("role");
  setAuthToken("");
  dispatch(setCurrentUser(""));
  history.push("/login");
};


export const { setCurrentUser } = userSlice.actions;
export default userSlice.reducer;



