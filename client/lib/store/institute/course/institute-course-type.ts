import { Status } from "@/lib/types/types";

export interface IInstituteCourseInitialDataCourse{
  courseName : string,
  coursePrice : string,
  id : string
}

export interface IInstituteCourseInitialData{
  status:Status,
  courses:IInstituteCourseInitialDataCourse[] //course bhaneko array huna sakxa 
}