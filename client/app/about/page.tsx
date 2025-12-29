import { useAppSelector } from "@/lib/store/hooks"
import { useSelector } from "react-redux"

function About(){
  //userslice bhitra name ra address bhitra j xa tyo retrieve garnu paryo 
  const data = useAppSelector((store)=>store.user) //userSlice ko initial data ko access milyo 
  return(
    <h1>this is about page</h1>
  )
}
export default About