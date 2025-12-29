import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUserInitialState } from "./types";
import API from "../http";


const userInitialState: IUserInitialState = {
  name: "",
  address: ""
}
const userSlice = createSlice({
  name: "userSlice", //room(slice) ko name k rakhney
  initialState: userInitialState,
  reducers: {
    //state : mathi ko initialState, action: trigger garda pathaune data aaune kura
    setName(state: IUserInitialState, action: PayloadAction<string>) {
      state.name = action.payload
    },
    setAddress(state: IUserInitialState, action: PayloadAction<string>) {
      state.address = action.payload
    }
  }
})
// dispatch(setName("Soniya"))
// dispatch(setAddress("Bhaktapur"))

const { setName, setAddress } = userSlice.actions
export default userSlice.reducer
export {
  setName,
  setAddress
}

//creating async thunks by ourself:
//register user ko api trigger garney
function registerUser(data) {
  return async function registerUserThunk() {
    try {
      const response = await API.post("/user/register", data)
      if (response.status === 200) {
        dispatch(setName(response.data.data.name))
      } else {

      }
    } catch (error) {
      console.log(error)
    }
  }
}

//login user ko api trigger garney
function loginUser() {
  return async function loginUserThunk() {
    try {
      const response = await API.post("/user/login")
      if (response.status === 200) {

      } else {

      }
    } catch (error) {
      console.log(error)
    }
  }
}

//forgot password ko api trigger garney
function forgotPassword() {
  return async function forgotPasswordThunk() {
    try {
      const response = await API.post("/user/forgot-password")
      if (response.status === 200) {

      } else {

      }
    } catch (error) {
      console.log(error)
    }
  }
}