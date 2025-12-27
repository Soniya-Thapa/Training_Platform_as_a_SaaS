import express, { Router } from "express"
const router : Router = express.Router() 

import Middleware from "../../middleware/middleware"
import { createCategoryTable, createCourseTable, createInstitute, createStudentTable, createTeacherTable } from "../../controller/institute/institute.controller"
import asyncErrorHandler from "../../services/async.Error.Handler"

//if we dont wrap the controller function then it will go in crash mode and in this mode, if there are 100users using this project then all the 100 users will be unable to run the project 
// imp note: sometimes wrapper function dont work in middleware
router.route("/create-institute").post(
  Middleware.isLoggedIn,
  createInstitute,
  createTeacherTable,
  createStudentTable,
  createCategoryTable,
  asyncErrorHandler(createCourseTable))

export default router