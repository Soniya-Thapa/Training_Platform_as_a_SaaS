import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUserInitialState } from "./types";


const userInitialState : IUserInitialState =  {
    name: "",
    address: ""
  }
const userSlice = createSlice({
  name: "userSlice", //room(slice) ko name k rakhney
  initialState: userInitialState,
  reducers : {
    //state : mathi ko initialState, action: trigger garda pathaune data aaune kura
    setName(state : IUserInitialState, action : PayloadAction<string>){
      state.name = action.payload
    },
    setAddress(state : IUserInitialState, action : PayloadAction<string>){
      state.address = action.payload
    }
  }
})
const {setName, setAddress} = userSlice.actions
dispatch(setName("Soniya"))
dispatch(setAddress("Bhaktapur"))
export default userSlice.reducer
export{
  setName,
  setAddress
}