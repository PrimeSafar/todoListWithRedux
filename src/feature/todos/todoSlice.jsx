import { createSlice } from "@reduxjs/toolkit";
const initialState ={
    todos:[],
}
export const todoSlice = createSlice({
    name:'todoSlice',
    initialState,
    reducers:{
        addTodo:(state ,action)=>{
            const newTodo ={
                id: Date.now(),
                text: action.payload
            }
            state.todos.push(newTodo)
        },
        deleteTodo: (state, action) => {
  state.todos = state.todos.filter(todo => todo.id !== action.payload);
}
    }


})
export const {addTodo , deleteTodo} =  todoSlice.actions
export default todoSlice.reducer;