import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../feature/todos/todoSlice"

export const store = configureStore({
    reducer:{
        todoSlice : todoReducer
    },
})