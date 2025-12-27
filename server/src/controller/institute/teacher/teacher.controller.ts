import { Request, Response } from "express";
import sequelize from "../../../database/connection";
import IExtendedRequest from "../../../globals/indes";
import generateRandomPassword from "../../../services/generate.random.password";
import { QueryTypes } from "sequelize";
import sendMail from "../../../services/send.mail";

const createTeacher = async (req:IExtendedRequest, res:Response)=>{
  const instituteNumber = req.user?.currentInstituteNumber
  const {teacherName, teacherEmail, teacherPhoneNumber, teacherExpertise, teacherJoinedDate, teacherSalary, courseId} = req.body 
  const teacherPhoto = req.file ? req.file.path : "https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-600nw-1677509740.jpg"
  if(!teacherName || !teacherEmail || !teacherPhoneNumber || !teacherExpertise || !teacherJoinedDate || !teacherSalary){
    res.status(400).json({
      message : "Please provide teacherName, teacherEmail, teacherPhoneNumber, teacherExpertise, teacherJoinedDate and teacherSalary."
    })
    return
  }
  const password = generateRandomPassword(teacherName)
  await sequelize.query(`INSERT INTO teacher_${instituteNumber}(teacherName, teacherEmail, teacherPhoneNumber, teacherExpertise, teacherJoinedDate, teacherSalary, teacherPhoto, teacherPassword) VALUES(?,?,?,?,?,?,?,?)`,{
    type: QueryTypes.INSERT,
    replacements:[teacherName, teacherEmail, teacherPhoneNumber, teacherExpertise, teacherJoinedDate, teacherSalary, teacherPhoto, password.hashedVersion]
  })
  const teacherData : {id :string}[]= await sequelize.query(`SELECT id FROM teacher_${instituteNumber} WHERE teacherEmail=?`,{
    type: QueryTypes.SELECT,
    replacements:[teacherEmail]
  })
  console.log("TeacherData: ",teacherData)
  await sequelize.query(`UPDATE course_${instituteNumber} SET teacherId=? WHERE id=?`,{
    type: QueryTypes.UPDATE,
    replacements:[teacherData[0].id , courseId]
  })
  // console.log("returned data : ", returnedData)
  //for sending mail
  const mailInformation = {
    to : teacherEmail,
    subject : "Welcome to our SaaS MERN Project.",
    text : `Welcome. Email : ${teacherEmail}, Password : ${password.plainVersion}, InstituteNumber: ${instituteNumber}`
  }
  await sendMail(mailInformation)
  res.status(200).json({
    message : "Teacher created successfully."
  })
}

const deleteTeacher = async (req: IExtendedRequest, res:Response)=>{
  const instituteNumber = req.user?.currentInstituteNumber
  const teacherId = req.params.id
  const [teacherData] = await sequelize.query(`SELECT *FROM course_${instituteNumber} where id=${teacherId}`) 
  if(teacherData.length == 0){
    return res.status(404).json({
      message : "No teacher found with that id."
    })
    return
  }
  await sequelize.query(`DELETE FROM course_${instituteNumber} WHERE id = ${teacherId}`)
  res.status(200).json({
    message :"Teacher deleted successfully."
  })
}

const getAllTeachers = async (req:IExtendedRequest,res:Response) =>{
  const instituteNumber = req.user?.currentInstituteNumber
  const [allTeacherData] = await sequelize.query(`SELECT * FROM course_${instituteNumber}`)
  if(allTeacherData.length == 0){
    return res.status(404).json({
      message : "There are no teachers."
    })
    return
  }
  res.status(200).json({
    message : "All teachers retrieved.",
    courses: allTeacherData || []
  }) 
}

const getSingleTeacher = async (req:IExtendedRequest,res:Response) =>{
  const instituteNumber = req.user?.currentInstituteNumber
  const teacherId = req.params.id
  const [teacherData] = await sequelize.query(`SELECT *FROM course_${instituteNumber} WHERE id= ${teacherId}`)
  if(teacherData.length == 0){
    return res.status(404).json({
      message :  "No teacher found with that id."
    })
    return
  }
  res.status(200).json({
    message : "Single teacher fetched.",
    courses: teacherData || []
  }) 
}

export {
  createTeacher,
  deleteTeacher,
  getAllTeachers,
  getSingleTeacher
}