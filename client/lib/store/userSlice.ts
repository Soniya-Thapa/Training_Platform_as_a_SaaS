import { createSlice } from "@reduxjs/toolkit";

createSlice({
  name: "userSlice", //room(slice) ko name k rakhney
  initialState: {
    name: "",
    address: ""
  },
  reducers : {
    //state : mathi ko initialState, action: trigger garda pathaune data aaune kura
    setName(state, action){
      state.name = "Soniya"
    },
    SetAddress(state, action){
      state.address = "Bhaktapur"
    }
  }
})