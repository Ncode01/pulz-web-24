import { createSlice } from '@reduxjs/toolkit';

const initialState = []; // Ensure state is an array

const studentSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {
    addStudent: (state, action) => {
      state.push(action.payload);
    },
    removeStudent: (state, action) => state.filter(student => student.id !== action.payload)
  }
});

export const { addStudent, removeStudent } = studentSlice.actions;
export default studentSlice.reducer;