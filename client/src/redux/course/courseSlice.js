import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentCourseId: null,
  allCourseData: [{
    _id: "",
    title: "",
    description: "",
    sections: []
  }],
  error: null,
};

const courseSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {
    setCurrentCourse: (state, action) => {
        state.currentCourseId = action.payload;
    },
    setAllCourseData: (state, action) => {
        state.allCourseData = action.payload;
    }
  },
});

export const {
  setCurrentCourse,
  setAllCourseData,

} = courseSlice.actions;

export default courseSlice.reducer;
