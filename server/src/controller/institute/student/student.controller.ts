import { Request, Response } from "express";
import sequelize from "../../../database/connection";
import IExtendedRequest from "../../../globals/indes";

const createStudent = async (req:IExtendedRequest, res:Response)=>{
  const instituteNumber = req.user?.currentInstituteNumber
  const {studentName, studentPhoneNo, studentAddress, enrolledDate} = req.body 
  if(!studentName || !studentPhoneNo || !studentAddress || !enrolledDate){
    res.status(400).json({
      message : "Please provide studentName, studentPhoneNo, studentAddress and enrolledDate."
    })
    return
  }
  const studentImage = null
  const returnedData = await sequelize.query(`INSERT INTO student_${instituteNumber}(studentName, studentPhoneNo, studentAddress, enrolledDate,studentImage) VALUES(?,?,?,?,?)`,{
    replacements:[studentName, studentPhoneNo, studentAddress, enrolledDate,studentImage || "http://soniyathapa.com/image/hello.png"]
  })
  console.log("returned data : ", returnedData)
  res.status(200).json({
    message : "Student created successfully."
  })
}

const deleteStudent = async (req: IExtendedRequest, res:Response)=>{
  const instituteNumber = req.user?.currentInstituteNumber
  const studentId = req.params.id
  const [studentData] = await sequelize.query(`SELECT *FROM student_${instituteNumber} where id=${studentId}`) 
  if(studentData.length == 0){
    return res.status(404).json({
      message : "No student found with that id."
    })
    return
  }
  await sequelize.query(`DELETE FROM student_${instituteNumber} WHERE id = ${studentId}`)
  res.status(200).json({
    message :"Student deleted successfully."
  })
}

const getAllStudents = async (req:IExtendedRequest,res:Response) =>{
  const instituteNumber = req.user?.currentInstituteNumber
  const [allStudentData] = await sequelize.query(`SELECT * FROM student_${instituteNumber}`)
  if(allStudentData.length == 0){
    return res.status(404).json({
      message : "There are no students."
    })
    return
  }
  res.status(200).json({
    message : "All students retrieved.",
    courses: allStudentData || []
  }) 
}

const getSingleStudent = async (req:IExtendedRequest,res:Response) =>{
  const instituteNumber = req.user?.currentInstituteNumber
  const studentId = req.params.id
  const [studentData] = await sequelize.query(`SELECT *FROM student_${instituteNumber} WHERE id= ${studentId}`)
  if(studentData.length == 0){
    return res.status(404).json({
      message :  "No student found with that id."
    })
    return
  }
  res.status(200).json({
    message : "Single course fetched.",
    courses: studentData || []
  }) 
}

export {
  createStudent,
  deleteStudent,
  getAllStudents,
  getSingleStudent
}