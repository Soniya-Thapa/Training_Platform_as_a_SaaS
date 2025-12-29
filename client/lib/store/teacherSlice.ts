import { createSlice } from "@reduxjs/toolkit";

const teacherSlice = createSlice({
  name : "teacherSlice",
  initialState :{
    teacherName : "",
    teacherPassword : ""
  },
  reducers: {
    setTeacherName(state, action){
      state.teacherName = "Krishna"
    },
    setTeacherPassword(state, action){
      state.teacherPassword = "qwertyuiop"
    }
  }
})
//  const setTeacherName = teacherSlice.actions.setTeacherName
//  const setTeacherPassoword = teacherSlice.actions.setTeacherPassword

 //destructure :
 const {setTeacherName,setTeacherPassword} = teacherSlice.actions
export default teacherSlice.reducer
export{
  setTeacherName,
  setTeacherPassword
}
//note :
// redux ma action pani aafailey configure garna parthiyo, but redux toolkit ley action aafai banayera dinxa manually banauna pardaina

// slice function call garda return ma action dinxa, ra reducers ma j naam ko function xa (reducer name) action pani tyehi naam ko hunxa as given below:
//const teacherSlice = {
//   actions: {
        // setTeacherName : (){}
        // setTeacherPassoword : (){}
//   },
//   ...
// }
//createSlice function always returns an object jaha vitra actions haru automatic generate bhayera aaerako hunxa

// Flow:
// reducers banney bittikai action create hunxa 
// kunai reducer lai communication garnu parney xa bhani, jun same name ko action baneko xa tyeslai call garnu parxa, jahily pani action hunxa reducer haina 

function registerTeacher(){
  return async function registerTeacherThunk(){
    
  }
}