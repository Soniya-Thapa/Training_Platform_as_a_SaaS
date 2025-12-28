import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IIncomingUserPayload, IInitialStudentData } from "./types";


const initialStudentData : IInitialStudentData = {
    data : ""
  }
const studentSlice = createSlice({
  name: "studentSlice",
  initialState : initialStudentData ,
  reducers:{
    setData(state : IInitialStudentData, action : PayloadAction<IIncomingUserPayload>){
      state.data = action.payload
    }
  }
})
const {setData} = studentSlice.actions
dispatch(setData({
  name : "Soniya",
  address :"Bhaktapur",
  age : 22
}))
export default studentSlice.reducer
export {
  setData
}