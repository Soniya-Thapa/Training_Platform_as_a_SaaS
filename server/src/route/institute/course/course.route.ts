import express, { Request, Router } from "express"
const router: Router = express.Router()

import { createCourse, deleteCourse, getAllCourses, getSingleCourse } from "../../../controller/institute/course/course.controller"
import Middleware from "../../../middleware/middleware"
import asyncErrorHandler from "../../../services/async.Error.Handler"
import upload from "../../../middleware/multer.upload"

//routes :
router.route("/")
  .post(
    Middleware.isLoggedIn,
    //if we are handling only one file then use upload.single(fieldname) and yo middleware main function ko just before ma place garney 
    //fieldname bhaneko FE/postman bata file kun name ma aaeraxa 
    // if the files are multiple then use array :upload.array("") 
    upload.single('courseThumbnail'),
    asyncErrorHandler(createCourse))
  .get(
    Middleware.isLoggedIn,
    asyncErrorHandler(getAllCourses))

router.route("/:id")
  .delete(asyncErrorHandler(deleteCourse))
  .get(
    Middleware.isLoggedIn,
    asyncErrorHandler(getSingleCourse))

export default router