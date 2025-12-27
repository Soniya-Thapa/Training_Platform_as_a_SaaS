import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"
import User from "../database/models/user.model";
import IExtendedRequest from "../globals/indes";
import { envConfig } from "../config/config";

// interface IExtendedRequest extends Request{
//   user :{
//     name : string
//   }
// }
//  static isLoggedIn (req : IExtendedRequest , res : Response){
//     //check if log in or not so we need token 
//     const token = req.user.name
//  }

// interface IResult {
//   id: string,
//   iat: number,
//   exp: number
// }

//Request ma bhako sabai tanera IExtentedRequest ma rakheko 
// interface IExtendedRequest extends Request {
//   user?: {
//     email: string,
//     role : string,
//     username : string |null
//   }
// }

class Middleware {
  static isLoggedIn(req: IExtendedRequest, res: Response, next: NextFunction) {
    try {
      //check if log in or not so we need token 
      //header ma authorization name ko key banako xa 
      const token = req.headers.authorization
      // console.log(token)
      if (!token) {
        res.status(401).json({
          error: "please provide token"
        })
        return
      }
      //verify token : ra verify garda hamro decrypt garera result ma pathauxa 
      //jwt.verify(token, secretkey, callback function)
      jwt.verify(token,envConfig.secretKey!, async (error, result: any) => { //result ma : j lukako tyo ani iat,exp return garxa
        if (error) {        //     id: result.id
          res.status(403).json({
            error: "invalid token"
          })
        } else {
          // console.log(result)
          // const userData = await User.findAll({ //array retuun garxa
          //   where: {
          //     id: result.id
          //   }
          // })
          // if (userData.length == 0) {
          //   res.status(404).json({
          //     message: "No user found with that id"
          //   })
          //   return
          // }

          //alternate:
          // console.log("asdfghjkl", result)
          const userData = await User.findByPk(result.id, {
            attributes: ["id", "currentInstituteNumber"]
          }) //object return garxa
          if (!userData) {
            res.status(404).json({
              message: "No user found with that id"
            })
            return
          }
          console.log("sucessfully verified")
          // console.log("asdfghjkl",userData)
          req.user = userData
          next() //yo garena bhani route ma yo method paxi arko method thiyo bhani tyo execute hunna 

        }
      })
    } catch (error) {
      console.log("Error:", error)
      res.status(500).json({
        message: error
      })
    }
  }
}

export default Middleware