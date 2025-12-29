//this file is maily used for combining all the slice
//you need to include all the slice here to insert or use the data

import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice"
import studentSlice from "./studentSlice"
import teacherSlice from "./teacherSlice"

const store = configureStore({
  reducer:{
    user : userSlice,
    student : studentSlice,
    teacher : teacherSlice
  }
})
export default store

//typeof ley kunai pani variable or other thing ko type k ho dinxa
export type AppDispatch = typeof store.dispatch //useDispatch lai type dina chahinxa
export type RootState = ReturnType<typeof store.getState> //useSelector lai type dina chahinxa
