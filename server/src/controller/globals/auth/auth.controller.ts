import { Request, Response } from "express"
import User from "../../../database/models/user.model"
import bcrypt from "bcrypt"
import generateJwtToken from "../../../services/generate.jwt.token"

// const registerUser = async (req : Request,res : Response)=>{

//   // const username = req.body.username
//   //   const password = req.body.password
//   //   const email = req.body.email

//   const {username, password,email} = req.body
//   if(!username || !password || !email){
//      res.status(400).json({
//       error : "Please provide username, password, email"
//     })
//    return
//   }
//   else{
//     //insert into user table 
//     await User.create({
//       username, password,email
//     })
//   }
//   res.status(200).json({
//     message : "user registered successfully"
//   })
// }

//yedi hami function lai bahira lekhxam bhani tyo function ho tara class bhitra xa bhani tyo method ho.
// same bahira xa bhani variable ra class bhitra xa bhani tyo attribute / properties
//hamro backend ma json data sandhai : req.body ma aauxa ra files,vedio,audio,image chahi : req.files

class AuthController {

  //static garexi class lai direct export garexi tyeha bhitra ko method nih export hunxa ani class ko object pani create garirakhna pardaina 
  static async registerUser(req: Request, res: Response) {
    // console.log(req.body)
    if (req.body == undefined) {
      res.status(400).json({
        error: "No data was sent"
      })
      return
    }
    const { username, password, email } = req.body

    if (!username || !password || !email) {
      res.status(400).json({
        error: "Please provide username, password, email"
      })
      return
    }

    //insert into user table 
    await User.create({
      username,
      password: bcrypt.hashSync(password, 12),
      //blowfish algorithm is used here
      //12  : salt value which determines the strength of password (security) and is indirectly proportional to user experience and directly proportional to time required
      //if hashsync xa then it is synchronous but if we want to perform asynchronous hashing then we use : async bcrypt.hash(password, 12) ra hash ko value harek time beglai beglai hunxa 
      email
    })
    //registration ko case ma status code 201 hunxa 
    res.status(201).json({
      message: "User registered successfully"
    })
  }

  //login
  static async loginUser(req: Request, res: Response) {
    const { email, password } = req.body
    //checking whether user entered email and password 
    if (!email || !password) {
      return res.status(400).json({
        message: "Please provide the required credentials"
      })
      
    }

    //checking whether the email exists or not in user table
    const data = await User.findAll({
      // kunai pani table bata tannai data nikalda array ma aauxa tara kunai euta matra data xa bhani object ma aauxa 
      where: {
        email
      }
    })
    // console.log("asdfghjkl;", data)
    // array ma data xa ki xaina bhanera check garna we should always use length. But for object we use : if(!data){}
    if (data.length == 0) {
      res.status(404).json({
        error: "There is no user of particular email"
      })
    }
    else {
      //comparesync(plain password : user ley halney , hash password : db ma store bhako )
      //why we are doing data[0] ?????
      //Because the value stored inside data is an array, so you must access the first element:
      // data[0].id
      // data[0].password
      // If you try data.id or data.password, it will be undefined (because arrays don’t have an id property).
      const isPasswordMatch = bcrypt.compareSync(password, data[0].password)
      if (isPasswordMatch) {
        const token =await generateJwtToken({ id: data[0].id}) //HS256 algorithm is used here
        console.log("asdfghjkl",token)
        res.status(200).json({
          token,
          message: "logged in "
        })
      }
      else {
        res.status(403).json({
          error: "Invalid email or password "
        })
      }
    }
  }
}

export default AuthController