import express, { Router } from "express"
const router: Router = express.Router()

import { createStudent,deleteStudent,getAllStudents,getSingleStudent } from "../../../controller/institute/student/student.controller"
import Middleware from "../../../middleware/middleware"
import asyncErrorHandler from "../../../services/async.Error.Handler"

router.route("/")
.post(
  Middleware.isLoggedIn,
  asyncErrorHandler(createStudent))
.get(asyncErrorHandler(getAllStudents))

router.route("/:id")
.delete(asyncErrorHandler(deleteStudent))
.get(
  Middleware.isLoggedIn,
  asyncErrorHandler(getSingleStudent))

export default router