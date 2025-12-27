import { NextFunction, Request, Response } from "express";
import sequelize from "../../database/connection";
import generateInstituteNumber from "../../services/random.institute.number";
import IExtendedRequest from "../../globals/indes";
import User from "../../database/models/user.model";
import { categories } from "../../seed";

// interface IExtendedRequest extends Request {
//   // user?: {
//   //   name: string
//   // }
// }

const createInstitute = async (req: IExtendedRequest, res: Response, next: NextFunction) => {
  try {
    // console.log(req.user, "name from middleware")
    const { instituteName, instituteEmail, institutePhoneNumber, instituteAddress } = req.body
    //vat no ra pan no maddhey kunai euta data hunxa
    const instituteVatNo = req.body.instituteVatNo || null
    const institutePanNo = req.body.institutePanNo || null

    if (!instituteName || !instituteEmail || !institutePhoneNumber || !instituteAddress) {
      res.status(400).json({
        message: "Please provide instituteName, instituteEmail, institutePhoneNumber, instituteAddress"
      })
      return
    }
    const instituteNumber = generateInstituteNumber()
    //else ma institute create garna paryo 
    //direct raw query use garda secure hudaina so hami raw query lai sequelize orm ko method bhitra wrap garera halxam 
    await sequelize.query(`
      CREATE TABLE IF NOT EXISTS institute_${instituteNumber}(
      id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
      instituteName VARCHAR(255) NOT NULL,
      instituteEmail VARCHAR(255) NOT NULL UNIQUE,
      institutePhoneNumber VARCHAR(255) NOT NULL UNIQUE,
      instituteAddress VARCHAR(255) NOT NULL,
      instituteVatNo VARCHAR(255),
      institutePanNo VARCHAR(255),
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP   
    )
  `)
    await sequelize.query(`
    INSERT INTO institute_${instituteNumber} (instituteName, instituteEmail, institutePhoneNumber, instituteAddress , institutePanNo ,instituteVatNo) VALUES (?,?,?,?,?,?)`, { //? = placeholder
      replacements: [instituteName, instituteEmail, institutePhoneNumber, instituteAddress, institutePanNo, instituteVatNo]
    })

    //creating user institute history table jaha user ley banako harek instituteko number same hunxa 
    await sequelize.query(`
    CREATE TABLE IF NOT EXISTS user_institute(
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    userID VARCHAR(255) REFERENCES users(id),
    instituteNumber INT UNIQUE
    )
  `)

    //alternate :User.findByPk(eq.user && req.user.id)
    // console.log("asdfghjkl", req.user)
    if (req.user) {
      // const user =await User.findByPk(req.user.id)
      // user?.currentInstituteNumber = instituteNumber
      // await user?.save()

      //alternate :
      await User.update({
        currentInstituteNumber: instituteNumber,
        role: "institute"
      }, {
        where: {
          id: req.user.id
        }
      })
      await sequelize.query(`
    INSERT INTO user_institute(userID, instituteNumber) VALUES (?,?)`, {
        replacements: [req.user.id, instituteNumber]
      })
    }
    req.instituteNumber = instituteNumber
    next()
  } catch (error) {
    console.log("Error : ", error)
    res.status(500).json({
      message: error
    })
  }
}

const createTeacherTable = async (req: IExtendedRequest, res: Response, next: NextFunction) => {
  try {
    const instituteNumber = req.instituteNumber
    await sequelize.query(`
      CREATE TABLE IF NOT EXISTS teacher_${instituteNumber}(
      id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
      teacherName VARCHAR(255),
      teacherEmail VARCHAR(255),
      teacherPhoneNumber VARCHAR(255),
      teacherExpertise VARCHAR(255),
      teacherJoinedDate DATE,
      teacherSalary VARCHAR(255),
      teacherPhoto VARCHAR(255),
      teacherPassword VARCHAR(255),
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP   
    )`)
    next()
  } catch (error) {
    console.log("Error:", error)
    res.status(500).json({
      message: error
    })
  }
}

const createStudentTable = async (req: IExtendedRequest, res: Response, next: NextFunction) => {
  try {
    const instituteNumber = req.instituteNumber
    await sequelize.query(`
      CREATE TABLE IF NOT EXISTS student_${instituteNumber}(
      id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
      studentName VARCHAR(255) NOT NULL,
      studentPhoneNo VARCHAR(255) NOT NULL UNIQUE,
      studentAddress TEXT NOT NULL,
      enrolledDate DATE NOT NULL,
      studentImage VARCHAR(255) NOT NULL,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP  
    )`)
    next()
  } catch (error) {
    console.log("Error:", error)
    res.status(500).json({
      message: error
    })
  }
}

const createCategoryTable = async (req: IExtendedRequest, res: Response, next: NextFunction) => {
  try {
    const instituteNumber = req.instituteNumber
    // console.log("req.user.institutenumber:",req.user?.currentInstituteNumber)
    // console.log("req.institutenumber:",req.instituteNumber)
    await sequelize.query(`CREATE TABLE IF NOT EXISTS category_${instituteNumber}(
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    categoryName VARCHAR(255) NOT NULL,
    categoryDescription TEXT, 
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP  
  )`)
    categories.forEach(async function (category) {
      await sequelize.query(`INSERT INTO category_${instituteNumber}(categoryName, categoryDescription) VALUES(?,?)`, {
        replacements: [category.categoryName, category.categoryDescripton]
      })
    })
    next()
  } catch (error) {
    console.log("Error: ", error)
    res.status(500).json({
      message: error
    })
  }
}

const createCourseTable = async (req: IExtendedRequest, res: Response, next: NextFunction) => {
  const instituteNumber = req.instituteNumber
  await sequelize.query(`
      CREATE TABLE IF NOT EXISTS course_${instituteNumber}(
      id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
      teacherId VARCHAR(36) REFERENCES teacher_${instituteNumber} (id),
      categoryId VARCHAR(36) NOT NULL REFERENCES category_${instituteNumber} (id),
      courseName VARCHAR(255) NOT NULL UNIQUE,
      coursePrice VARCHAR(255) NOT NULL,
      courseDuration VARCHAR(100) NOT NULL,
      courseThumbnail VARCHAR(255),
      courseLevel ENUM('beginner','intermediate','advance') NOT NULL,
      courseDescription TEXT,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP  
    )`)
  res.status(200).json({
    message: "Institute Created",
    instituteNumber
  })
}



export {
  createInstitute,
  createTeacherTable,
  createStudentTable,
  createCategoryTable,
  createCourseTable
}