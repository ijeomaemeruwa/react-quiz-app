import { configureStore } from "@reduxjs/toolkit";
import userSlice from './features/user/userSlice';
import quizSlice from './features/quiz/quizSlice';

export const store = configureStore({
    reducer: {
        user: userSlice,
        quiz: quizSlice
    },
})



