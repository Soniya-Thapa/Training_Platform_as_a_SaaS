import { setName } from "@/lib/store/userSlice";
import { useDispatch } from "react-redux";

export default function Home() {
  let name =  "Soniya"
  const dispatch = useDispatch()
  // setName(name) => hamley yesari direct action call garna mildaina
  dispatch(setName(name))
  return (
   <h1>hello world </h1>
  );
}
