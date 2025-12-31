import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IInitialTeacherDataWithCourse, IInstituteTeacherInitialData, IInstituteTeacherInitialDataTeacher, TeacherExpertise } from "./institute-teacher-type";
import { Status } from "@/lib/types/types";
import { AppDispatch } from "../../store";
import API from "@/lib/http";

const initialState: IInstituteTeacherInitialData = {
  teacher: {
    course: {
      courseName: "",
      coursePrice: "",
      courseThumbnail: ""
    },
    teacherName: "",
    teacherEmail: "",
    teacherPhoneNumber: "",
    teacherExpertise: TeacherExpertise.Beginner,
    teacherJoinedDate: "",
    teacherSalary: "",
    teacherPhoto : ""
  },
  status: Status.LOADING
}
const instituteTeacherSlice = createSlice({
  name: "institute-teacher",
  initialState: initialState,
  reducers: {
    setStatus(state : IInstituteTeacherInitialData,action:PayloadAction<Status>){
      state.status = action.payload
    },
    setTeacher(state:IInstituteTeacherInitialData, action:PayloadAction<IInstituteTeacherInitialDataTeacher>){
      state.teacher=action.payload
    }
  }
})

const {setStatus,setTeacher} = instituteTeacherSlice.actions
export default instituteTeacherSlice.reducer

export function createInstituteTeacher(data : IInstituteTeacherInitialDataTeacher){
  return async function createInstituteTeacherThunk(dispatch:AppDispatch) {
   try {
    const response = await API.post("/institute/teacher", data)
    if(response.status === 201){
      dispatch(setStatus(Status.SUCCESS))
    }else{
      dispatch(setStatus(Status.ERROR))
    }
   } catch (error) {
    console.log(error)
      dispatch(setStatus(Status.ERROR))
   } 
  }
}

export function fetchInstituteTeacher(){
  return async function fetchInstituteTeacherThunk(dispatch:AppDispatch) {
   try {
    const response = await API.get("/institute/teacher")
    if(response.status === 200){
      dispatch(setStatus(Status.SUCCESS))
      response.data.data.length > 0 && dispatch(setTeacher(response.data.data))
    }else{
      dispatch(setStatus(Status.ERROR))
    }
   } catch (error) {
    console.log(error)
      dispatch(setStatus(Status.ERROR))
   } 
  }
}

export function deleteInstituteTeacherById(id : string){
  return async function deleteInstituteTeacherByIdThunk(dispatch:AppDispatch) {
   try {
    const response = await API.delete("/institute/teacher/" + id)
    if(response.status === 200){
      dispatch(setStatus(Status.SUCCESS))
      //we also need to popout teacher of that id from slice too

    }else{
      dispatch(setStatus(Status.ERROR))
    }
   } catch (error) {
    console.log(error)
      dispatch(setStatus(Status.ERROR))
   } 
  }
}