import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IInstituteTeacherInitialData, IInstituteTeacherInitialDataTeacher, TeacherExpertise } from "./institute-teacher-type";
import { Status } from "@/lib/types/types";
import { AppDispatch } from "../../store";
import APIWITHTOKEN from "@/lib/http/apiWithToken";
import { ITeacherPostData } from "../../teacher/teacher.types";

const initialState: IInstituteTeacherInitialData = {
  teachers:[],
  status: Status.LOADING
}
const instituteTeacherSlice = createSlice({
  name: "institute-teacher",
  initialState: initialState,
  reducers: {
    setStatus(state : IInstituteTeacherInitialData,action:PayloadAction<Status>){
      state.status = action.payload
    },
    setTeacher(state:IInstituteTeacherInitialData, action:PayloadAction<IInstituteTeacherInitialDataTeacher[]>){
      state.teachers=action.payload
    },
    setRemoveTeacherById(state:IInstituteTeacherInitialData,action:PayloadAction<string>){
      const index = state.teachers.findIndex((teacher)=>teacher.id === action.payload)
      if(index !== -1){
        state.teachers.splice(index, 1)
      }
    }
  }
})

export const {setStatus,setTeacher,setRemoveTeacherById} = instituteTeacherSlice.actions
export default instituteTeacherSlice.reducer

export function createInstituteTeacher(data : ITeacherPostData){
  return async function createInstituteTeacherThunk(dispatch:AppDispatch) {
   try {
    const response = await APIWITHTOKEN.post("/institute/teacher", data,{
      headers:{
        "Content-Type" : "multipart/form-data"
      }
    })
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
    const response = await APIWITHTOKEN.get("/institute/teacher")
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
    const response = await APIWITHTOKEN.delete("/institute/teacher/" + id)
    if(response.status === 200){
      dispatch(setStatus(Status.SUCCESS))
      //we also need to popout teacher of that id from slice too
      dispatch(setRemoveTeacherById(id))
    }else{
      dispatch(setStatus(Status.ERROR))
    }
   } catch (error) {
    console.log(error)
      dispatch(setStatus(Status.ERROR))
   } 
  }
}