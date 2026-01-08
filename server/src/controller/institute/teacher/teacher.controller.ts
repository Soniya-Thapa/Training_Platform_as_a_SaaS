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
  if(!teacherName || !teacherEmail || !teacherPhoneNumber || !teacherExpertise || !teacherJoinedDate || !teacherSalary || !courseId){
    res.status(400).json({
      message : "Please provide teacherName, teacherEmail, teacherPhoneNumber, teacherExpertise, teacherJoinedDate, courseID and teacherSalary."
    })
    return
  }
  const password = generateRandomPassword(teacherName)
  await sequelize.query(`INSERT INTO teacher_${instituteNumber}(teacherName, teacherEmail, teacherPhoneNumber, teacherExpertise, teacherJoinedDate, teacherSalary, teacherPhoto, teacherPassword, courseId) VALUES(?,?,?,?,?,?,?,?,?)`,{
    type: QueryTypes.INSERT,
    replacements:[teacherName, teacherEmail, teacherPhoneNumber, teacherExpertise, teacherJoinedDate, teacherSalary, teacherPhoto, password.hashedVersion, courseId]
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

const deleteTeacher = async (req: IExtendedRequest, res: Response) => {
  try {
    const instituteNumber = req.user?.currentInstituteNumber
    const teacherId = req.params.id

    // 1️⃣ Check if teacher exists
    const teacherData = await sequelize.query(
      `SELECT * FROM teacher_${instituteNumber} WHERE id = :id`,
      {
        replacements: { id: teacherId },
        type: QueryTypes.SELECT
      }
    )

    if (teacherData.length === 0) {
      return res.status(404).json({
        message: "No teacher found with that id."
      })
    }

    // 2️⃣ Delete teacher (CORRECT TABLE)
    await sequelize.query(
      `DELETE FROM teacher_${instituteNumber} WHERE id = :id`,
      {
        replacements: { id: teacherId }
      }
    )

    return res.status(200).json({
      message: "Teacher deleted successfully."
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      message: "Internal server error"
    })
  }
}

const getAllTeachers = async (req:IExtendedRequest,res:Response) =>{
  const instituteNumber = req.user?.currentInstituteNumber
  if (!instituteNumber) {
  return res.status(401).json({
    message: "Institute number missing. Please login again."
  });
}
  const [allTeacherData] = await sequelize.query(`SELECT t.*,c.courseName FROM teacher_${instituteNumber} AS t JOIN course_${instituteNumber} AS c ON t.courseId = c.id`)
  if(allTeacherData.length == 0){
    return res.status(404).json({
      message : "There are no teachers."
    })
    return
  }
  console.log("xcvbnm",allTeacherData)
  res.status(200).json({
    message : "All teachers retrieved.",
    data: allTeacherData || [] 
  }) 
}

const getSingleTeacher = async (req: IExtendedRequest, res: Response) => {
  try {
    const instituteNumber = req.user?.currentInstituteNumber
    const teacherId = req.params.id

    const teacherData = await sequelize.query(
      `SELECT * FROM teacher_${instituteNumber} WHERE id = :id`,
      {
        replacements: { id: teacherId },
        type: QueryTypes.SELECT
      }
    )

    if (teacherData.length === 0) {
      return res.status(404).json({
        message: "No teacher found with that id."
      })
    }

    return res.status(200).json({
      message: "Single teacher fetched.",
      teacher: teacherData[0]
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      message: "Internal server error"
    })
  }
}

export {
  createTeacher,
  deleteTeacher,
  getAllTeachers,
  getSingleTeacher
}