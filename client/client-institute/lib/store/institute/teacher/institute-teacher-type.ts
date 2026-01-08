import { Status } from "@/lib/types/types";

export enum TeacherExpertise {
  Beginner = "beginner",
  Intermediate = "intermediate",
  Pro = "pro"
}
interface IInstituteTeacherInitialDataTeacherCourse {
  courseName: string,
  coursePrice: string,
  courseThumbnail: string
}
export interface IInstituteTeacherInitialDataTeacher {
  id: string,
  teacherName: string | null,
  teacherEmail: string | null,
  teacherPhoneNumber: string,
  teacherExpertise: TeacherExpertise,
  teacherSalary: string,
  teacherJoinedDate: string,
  teacherPhoto: string,
  createdAt: string,
  courseName: string
}

interface IInitialTeacherDataWithCourse extends IInstituteTeacherInitialDataTeacher {
  course?: IInstituteTeacherInitialDataTeacherCourse

}

export interface IInstituteTeacherInitialData {
  teachers: IInitialTeacherDataWithCourse[],
  status: Status
}