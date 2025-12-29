"use client"
import { useAppDispatch } from "@/lib/store/hooks"
import { setAddress, setName } from "@/lib/store/userSlice"
import { useDispatch } from "react-redux"

function Contact(){
  let name = "Soniya"
  let address = "Bhaktapur"
  const dispatch= useAppDispatch()
  dispatch(setName(name))
  dispatch(setAddress(address))
  return(
    <h1>this is contact page</h1>
  )
}
export default Contact