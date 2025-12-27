//teacher login functionality 

import { NextFunction, Response } from "express";
import IExtendedRequest from "../../globals/indes";
import sequelize from "../../database/connection";
import { QueryTypes } from "sequelize";
import bcrypt from "bcrypt"
import generateJwtToken from "../../services/generate.jwt.token";

interface ITeacherdata {
  teacherPassword: string,
  id : string
}

const teacherLogin = async (req: IExtendedRequest, res: Response, next: NextFunction) => {
  const { teacherEmail, teacherPassword, teacherInstituteNumber } = req.body
  if (!teacherEmail || !teacherPassword || !teacherInstituteNumber) {
    return res.status(400).json({
      message: "Please provide teacherEmail, teacherPassword and teacherInstituteNumber."
    })
  }
  //teacherData is an array but ITeacherdata is an object type so we convert it into array by ITeacherdata[]
  const teacherData: ITeacherdata[] = await sequelize.query(`SELECT * FROM teacher_${teacherInstituteNumber} WHERE teacherEmail = ?`, {
    type: QueryTypes.SELECT,
    replacements: [teacherEmail]
  })
  if (teacherData.length == 0) {
    return res.status(404).json({
      message: "Invalid Credentials."
    })
  }
  const isPasswordMatched = bcrypt.compareSync(teacherPassword, teacherData[0].teacherPassword)
  if (!isPasswordMatched) {
    res.status(400).json({
      message: "Invalid Credentials."
    })
  } else {
    const token = generateJwtToken({
      id :teacherData[0].id,
      instituteNumber: teacherInstituteNumber
    })
    res.status(200).json({
      token,
      message: "logged in "
    })
  }
}

export {
  teacherLogin
}