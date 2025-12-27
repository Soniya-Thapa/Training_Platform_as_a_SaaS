import { Request, Response } from "express";
import sequelize from "../../../database/connection";
import IExtendedRequest from "../../../globals/indes";

const createCourse = async (req: IExtendedRequest, res: Response) => {
  const instituteNumber = req.user?.currentInstituteNumber
  const { courseName, coursePrice, courseDuration, courseLevel, courseDescription ,categoryId} = req.body
  if (!courseName || !coursePrice || !courseDuration || !courseLevel || !courseDescription ||!categoryId) {
    res.status(400).json({
      message: "Please provide courseName, coursePrice, courseDuration, courseLevel, categoryId and courseDescription."
    })
    return
  }
  // console.log("req.file content : ", req.file)
  //   req.file content :  {
  //   fieldname: 'courseThumbnail',
  //   originalname: 'background_img.png',
  //   encoding: '7bit',
  //   mimetype: 'image/png',
  //   path: 'https://res.cloudinary.com/dg5egidyh/image/upload/v1759375873/wfxuur20vksmdz2dqnmr.png',
  //   size: 373411,
  //   filename: 'wfxuur20vksmdz2dqnmr'
  // }
  const courseThumbnail = req.file ? req.file.path : null
  const returnedData = await sequelize.query(`INSERT INTO course_${instituteNumber}(courseName, coursePrice, courseDuration, courseThumbnail, courseLevel, courseDescription, categoryId) VALUES(?,?,?,?,?,?,?)`, {
    replacements: [courseName, coursePrice, courseDuration, courseThumbnail, courseLevel, courseDescription, categoryId]
  })
  console.log("returned data : ", returnedData)
  res.status(200).json({
    message: "Course created successfully."
  })
}

const deleteCourse = async (req: IExtendedRequest, res: Response) => {
  const instituteNumber = req.user?.currentInstituteNumber
  const courseId = req.params.id
  //check whether the particular course exist or not . 
  const [courseData] = await sequelize.query(`SELECT *FROM course_${instituteNumber} where id=${courseId}`) // it will return array
  //the reason i am doing [courseData] is that we only need the course data but select * will send other metadata too so we are destructureing it .
  //instead this we can also do : 
  //if(courseData[0].length == 0){
  //code here 
  //}
  //its because the data is in array 0th index and in other index there are some other metadata
  if (courseData.length == 0) {
    return res.status(404).json({
      message: "No course found with that id."
    })
    return
  }
  await sequelize.query(`DELETE FROM course_${instituteNumber} WHERE id = ${courseId}`)
  res.status(200).json({
    message: "Course deleted successfully."
  })
}

const getAllCourses = async (req: IExtendedRequest, res: Response) => {
  const instituteNumber = req.user?.currentInstituteNumber
  const [allCourseData] = await sequelize.query(`SELECT * FROM course_${instituteNumber} JOIN category_${instituteNumber} ON course_${instituteNumber}.categoryId = category_${instituteNumber}.id`)
  if (allCourseData.length == 0) {
    return res.status(404).json({
      message: "There are no courses."
    })
    return
  }
  res.status(200).json({
    message: "All courses retrieved.",
    courses: allCourseData || []
  })
}

const getSingleCourse = async (req: IExtendedRequest, res: Response) => {
  const instituteNumber = req.user?.currentInstituteNumber
  const courseId = req.params.id
  const [courseData] = await sequelize.query(`SELECT *FROM course_${instituteNumber} WHERE id= ${courseId}`)
  if (courseData.length == 0) {
    return res.status(404).json({
      message: "No course found with that id."
    })
    return
  }
  res.status(200).json({
    message: "Single course fetched.",
    courses: courseData || []
  })
}

export {
  createCourse,
  deleteCourse,
  getAllCourses,
  getSingleCourse
}