import { Status } from "@/lib/types/types";

export interface IInstituteCourseInitialDataCourse {
   id: string
  courseName: string
  coursePrice: string
  courseDuration?: string
  courseLevel?: string
  courseDescription?: string
  courseThumbnail?: string
  categoryId?: string
  createdAt?: string
}

export interface IInstituteCourseInitialData {
  status: Status,
  courses: IInstituteCourseInitialDataCourse[] //course bhaneko array huna sakxa 
}

export interface ICoursePostData {
  courseName: string,
  coursePrice: string,
  courseDuration: string,
  courseLevel: string,
  courseDescription: string,
  courseThumbnail: File | null,
  categoryId: string
}