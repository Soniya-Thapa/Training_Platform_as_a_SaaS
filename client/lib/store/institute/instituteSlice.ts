import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IInstitute, IInstituteInitialData } from "./instituteSlice.types";
import { Status } from "@/lib/types/types";

const initialState : IInstituteInitialData = {
  institute : {
    instituteName : "",
    instituteEmail : "",
    instituteAddress : "",
    institutePhoneNumber : ""
  },
  status : Status.LOADING
}
const instituteSlice = createSlice({
  name : "institute",
  initialState : initialState,
  reducers:{
    setInstitute(state : IInstituteInitialData, action : PayloadAction<IInstitute>){
      state.institute = action.payload
    },
    setStatus(state : IInstituteInitialData, action:PayloadAction<Status>){
      state.status = action.payload
    }
  }
})

const {setInstitute, setStatus} = instituteSlice.actions
export default instituteSlice.reducer