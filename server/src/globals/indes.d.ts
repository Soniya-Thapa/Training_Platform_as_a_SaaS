//Request ma bhako sabai tanera IExtentedRequest ma rakheko 
import { Request } from "express"
interface IExtendedRequest extends Request {
  user?: {
    id: string,
    currentInstituteNumber: string,
  },
  instituteNumber? : number | string
}
export default IExtendedRequest