import { NextFunction, Request, Response } from "express"

// higher order function : function jasley parameter ma arko function accept garxa EG: filter , map , reduce, foreach
// callback function : tyo function jun as parameter or argument arko function ma gaeraxa . 

//wrapper function: we are creating this instead of writing try-catch in every controller function

const asyncErrorHandler =(fn: Function)=>{
  return (req:Request, res: Response, next: NextFunction)=>{
    Promise.resolve(fn(req,res,next)).catch((err:Error)=>{
      console.log("ERROR",err)
      return res.status(500).json({
        message : err.message,
        fullError : err
      })
    })
  }
}
export default asyncErrorHandler