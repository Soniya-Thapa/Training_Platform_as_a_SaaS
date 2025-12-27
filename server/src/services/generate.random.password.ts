import bcrypt from "bcrypt"

const generateRandomPassword = (teacherName : string)=>{
  const randomNumber = Math.floor(10000 + Math.random() * 90000)
  const passwordData = {
    hashedVersion : bcrypt.hashSync(`${randomNumber}_${teacherName}`, 10), //this password is for storing in database 
    plainVersion : `${randomNumber}_${teacherName}` // this password is for sending to the teacher through email 
  }
  return passwordData
}
export default generateRandomPassword