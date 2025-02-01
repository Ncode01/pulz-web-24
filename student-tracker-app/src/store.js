import { configureStore } from '@reduxjs/toolkit';
import studentReducer from './redux/studentSlice';
// ...existing code...
const store = configureStore({
	reducer: { students: studentReducer },
});
export default store;
// ...existing code...
