import { Status } from "@/lib/types/types";

export enum TeacherExpertise {
  Beginner = "beginner",
  Intermediate = "intermediate",
  Pro = "pro"
}
interface IInstituteTeacherInitialDataTeacherCourse{
  courseName: string,
  coursePrice : string,
  courseThumbnail : string
}
export interface IInstituteTeacherInitialDataTeacher{
  teacherName :string | null, 
  teacherEmail : string | null, 
  teacherPhoneNumber: string, 
  teacherExpertise : TeacherExpertise, 
  teacherJoinedDate : string, 
  teacherSalary:string,
  teacherPhoto : string,
  course: IInstituteTeacherInitialDataTeacherCourse
}

export interface IInitialTeacherDataWithCourse extends IInstituteTeacherInitialDataTeacher{
  course:IInstituteTeacherInitialDataTeacherCourse
}
export interface IInstituteTeacherInitialData{
  teacher : IInstituteTeacherInitialDataTeacher,
  status : Status
}