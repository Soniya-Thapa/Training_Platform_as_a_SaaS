import express, { Router } from "express"
const router : Router = express.Router() 

import AuthController from "../../../controller/globals/auth/auth.controller";
import asyncErrorHandler from "../../../services/async.Error.Handler";

router.route("/register").post(
  asyncErrorHandler(AuthController.registerUser))
router.route("/login").post(
  asyncErrorHandler(AuthController.loginUser))

export default router