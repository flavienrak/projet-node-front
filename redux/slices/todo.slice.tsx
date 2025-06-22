import { createSlice } from '@reduxjs/toolkit';
import { TodoInterface } from '@/interfaces/todo.interface';

const initialState: { todos: TodoInterface[] } = {
  todos: [],
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setTodosReducer: (state, action) => {
      const data: { todos: TodoInterface[] } = action.payload;
      state.todos = data.todos;
    },
    addTodoReducer: (state, action) => {
      const data: { todo: TodoInterface } = action.payload;

      const todoIndex = state.todos.findIndex(
        (item) => item.id === data.todo.id,
      );

      if (todoIndex !== -1) {
        state.todos[todoIndex] = data.todo;
      } else {
        state.todos = [...state.todos, data.todo];
      }
    },
    updateTodoReducer: (state, action) => {
      const data: { todo: TodoInterface } = action.payload;

      const todoIndex = state.todos.findIndex(
        (item) => item.id === data.todo.id,
      );

      if (todoIndex !== -1) {
        state.todos[todoIndex] = data.todo;
      }
    },
    deleteTodoReducer: (state, action) => {
      const data: { todoId: number } = action.payload;

      state.todos = state.todos.filter((item) => item.id !== data.todoId);
    },
  },
});

export const {
  setTodosReducer,
  addTodoReducer,
  updateTodoReducer,
  deleteTodoReducer,
} = todoSlice.actions;

export default todoSlice.reducer;
