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

app.use(express.json()) //done for parsing data(json data)

app.use("/auth",authRoutes)

//institutes routes
app.use("/institute",instituteRoutes)
app.use("/institute/course",courseInstituteRoutes)
app.use("/institute/student",studentInstituteRoutes)
app.use("/institute/teacher",teacherInstituteRoutes)
app.use("/institute/category",categoryInstituteRoutes)

//teacher routes
app.use("/teacher",teacherRoutes)

export default app

