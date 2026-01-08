import express, { Router } from "express"
const router: Router = express.Router()

import { createCategory,getAllCategories,deleteCategory,getSingleCategory } from "./../../../controller/institute/category/category.controller"
import Middleware from "../../../middleware/middleware"
import asyncErrorHandler from "../../../services/async.Error.Handler"

router.route("/")
.post(
  Middleware.isLoggedIn,
  asyncErrorHandler(createCategory))
  .get(
  Middleware.isLoggedIn,
  asyncErrorHandler(getAllCategories))

router.route("/:id")
.delete(
  Middleware.isLoggedIn,
  asyncErrorHandler(deleteCategory))
.get(
  Middleware.isLoggedIn,
  asyncErrorHandler(getSingleCategory))

export default router