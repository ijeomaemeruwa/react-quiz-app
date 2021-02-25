import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {history} from '../utils/history';


export const fetchQuizData = createAsyncThunk(
  "quiz/fetchQuizData",
   async () => {
    try {
      const res = await axios.get("https://hasquiz-api.herokuapp.com/api/quiz");
      console.log(res);
      const { data } = res.data;
      return data[0] 
    } catch (error) {
      console.log(error);
    }
  }
);


export const submitQuizData = createAsyncThunk(
 "quiz/submitQuizData",
  async(quizAnswers) => {
    try{
      const response = await axios.post('https://hasquiz-api.herokuapp.com/api/submit', 
       quizAnswers)
       console.log(response);
      const { correctCount } = response.data.meta;
      history.push("/start");
      return correctCount 
    }catch(error){
      console.log(error)
    }
  }
)


const quizSlice = createSlice({
    name: 'quiz',
    initialState: {
      quizData: {},
      loading: true
    },
    reducers: {},
    extraReducers: {
    //GetQuizData
    [fetchQuizData.pending]: (state) => {
      state.loading = true;
    },
    [fetchQuizData.fulfilled]: (state, {payload: quizData}) => {
      state.quizData = quizData;
      state.loading = false;
    },
    [fetchQuizData.rejected]: (state) => {
      state.loading = null;
    },
    //submitQuizData
    [submitQuizData.rejected]: (state, action) => {
      console.log(action.payload)
    }
  } 
  })


export default quizSlice.reducer;