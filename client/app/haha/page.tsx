"use client"

import { useAppSelector } from "@/lib/store/hooks"
import { useSelector } from "react-redux"

function Haha(){
  
  //Alternate:
  // const {teacherName, teacherAddress} = useSelector((store)=>store.teacher)
  
  const data = useAppSelector((store)=>store.teacher)

  // data ma k k hunxa bhanda 
  // data = {
  //   teacherName, 
  //   teacherAddress
  // }
  return(
    <h1>
      Nepal best 'IT' training
    </h1>
  )
}
export default Haha