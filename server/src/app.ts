import express from "express"
const app = express()

import authRoutes from "./route/globals/auth/auth.route"

//institutes routes
import instituteRoutes from "./route/institute/institute.route"
import courseInstituteRoutes from "./route/institute/course/course.route"
import studentInstituteRoutes from "./route/institute/student/student.route"
import teacherInstituteRoutes from "./route/institute/teacher/teacher.route"
import categoryInstituteRoutes from "./route/institute/category/category.route"

//teacher routes
import teacherRoutes from "../src/route/teacher/teacher.route"

import cors from "cors"

app.use(express.json()) //done for parsing data(json data)

//cors config
app.use(cors({
  origin :"http://localhost:3000"
}))

app.use("/api/auth",authRoutes)

//institutes routes
app.use("/api/institute",instituteRoutes)
app.use("/api/institute/course",courseInstituteRoutes)
app.use("/api/institute/student",studentInstituteRoutes)
app.use("/api/institute/teacher",teacherInstituteRoutes)
app.use("/api/institute/category",categoryInstituteRoutes)

//teacher routes
app.use("/api/teacher",teacherRoutes)

export default app

