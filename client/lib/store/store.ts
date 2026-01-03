//this file is maily used for combining all the slice
//you need to include all the slice here to insert or use the data

import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice"
import teacherSlice from "./teacher/teacherSlice"
import instituteSlice from "./institute/instituteSlice"
import categorySlice from "./institute/category/institute-category-slice"

const store = configureStore({
  reducer: {
    auth: authSlice,
    teacher : teacherSlice,
    institute : instituteSlice,
    category : categorySlice
  }
})
export default store

//typeof ley kunai pani variable or other thing ko type k ho dinxa
export type AppDispatch = typeof store.dispatch //useDispatch lai type dina chahinxa
export type RootState = ReturnType<typeof store.getState> //useSelector lai type dina chahinxa
