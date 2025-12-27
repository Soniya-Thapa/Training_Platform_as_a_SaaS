//multer :
// import { storage,multer } from "../../../middleware/multer.Middleware"
// const upload = multer({storage: storage})

//cloudinary : 
import { Request } from "express"
import { multer } from "../middleware/multer.Middleware"
import { cloudinary, storage } from "../services/cloudinary.Config"
const upload = multer({
  storage: storage,
  //doing validation for image files
  fileFilter: (req: Request, file: Express.Multer.File, cb: any) => {
    const allowedFileTypes = ['image/png', 'image/jpg', 'image/jpeg']
    //A mimetype (also called media type or content type) is a string that tells a program what kind of data a file contains.
    //     Examples:
    // File type	Mimetype
    // JPEG image	image/jpeg
    // PNG image	image/png
    // PDF document	application/pdf
    // Plain text	text/plain
    // JSON data	application/json
    // MP4 video	video/mp4
    if (allowedFileTypes.includes(file.mimetype)) {
      //cb(error,success): 2 argument
      cb(null, true)
    }
    else {
      //cb(error): 1 argument
      cb(new Error("The file you provided is in unsupported format."))
    }
  },
  limits:{
    fileSize: 4*1024*1024 //4mb
  }
})

export default upload