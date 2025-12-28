//this file is maily used for combining all the slice
//you need to include all the slice here to insert or use the data

import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice"
import studentSlice from "./studentSlice"
import teacherSlice from "./teacherSlice"

const store = configureStore({
  reducer:{
    userSlice : userSlice,
    studentSlice : studentSlice,
    teacherSlice
  }
})
export default store

//typeof ley kunai pani variable or other thing ko type k ho dinxa
export type AppDispatch = typeof store.dispatch
