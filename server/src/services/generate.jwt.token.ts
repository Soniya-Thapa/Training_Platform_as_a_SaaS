import jwt from "jsonwebtoken"
import { envConfig } from "../config/config"

const generateJwtToken = async(dataToEncrypt :{
  id:string,
  instituteNumber?: string
})=>{
  //@ts-ignore
  const token = jwt.sign( //token generate garney jwt.sign(k lai lukauney,secret key, expiry date)
    { id: dataToEncrypt.id },
    envConfig.secretKey!,  
    { expiresIn: envConfig.jwtExpire }) //HS256 algorithm is used here
  return token 
}
export default generateJwtToken