import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchQuizData = createAsyncThunk(
  "quiz/fetchQuizData",
  async () => {
    try {
      const res = await axios.get("https://hasquiz-api.herokuapp.com/api/quiz");
      console.log(res);
      // const data = res.data.data
      // return data
      const { data } = res.data;
      return data[0] 
    } catch (error) {
      console.log(error);
    }
  }
);


// const submitQuizData = createAsyncThunk(
//  "quiz/submitQuizData",
//   async() => {

//     }
// )


const quizSlice = createSlice({
    name: 'quiz',
    initialState: {
      quizData: {},
      loading: false,
      hasErrors: false
    },
    reducers: {
     
    },
    extraReducers: {
    //GetQuizData
    [fetchQuizData.pending]: (state) => {
      state.loading = true;
    },
    [fetchQuizData.fulfilled]: (state, {payload: quizData}) => {
      state.quizData = quizData;
      state.loading = false;
      state.hasErrors = false
    },
    [fetchQuizData.rejected]: (state) => {
      state.loading = null;
      state.hasErrors = true
    }

    //submitQuizData
  } 
  })


export default quizSlice.reducer