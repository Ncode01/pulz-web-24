import { configureStore } from '@reduxjs/toolkit';
import studentReducer from './redux/studentSlice';

const store = configureStore({
  reducer: { students: studentReducer },
});

export default store;
