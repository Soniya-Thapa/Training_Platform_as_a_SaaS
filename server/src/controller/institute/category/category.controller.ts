import { NextFunction, Response ,} from "express";
import IExtendedRequest from "../../../globals/indes";
import sequelize from "../../../database/connection";
import { QueryTypes } from "sequelize";


const createCategory = async (req:IExtendedRequest, res:Response, next: NextFunction)=>{
  const instituteNumber = req.user?.currentInstituteNumber
  const {categoryName, categoryDescription} = req.body
  if(!categoryName || !categoryDescription){
    return res.status(400).json({
      message : "Please provide categoryName and categoryDescription."
    })
  }
  await sequelize.query(`INSERT INTO category_${instituteNumber}(categoryName, categoryDescription) VALUES(?,?)`,{
    type: QueryTypes.INSERT,
    replacements:[categoryName, categoryDescription]
  })
  res.status(200).json({
    message :"Category added successfully."
  })
}

const getAllCategories = async (req:IExtendedRequest, res:Response, next: NextFunction)=>{
  const instituteNumber = req.user?.currentInstituteNumber
  const allCategoryData = await sequelize.query(`SELECT * FROM category_${instituteNumber}`,{
    type: QueryTypes.SELECT // this returns the row of data only but not the second data i.e., metadata
  })
  //alternate :
  // const [allCategoryData] = await sequelize.query(`SELECT * FROM category_${instituteNumber}`)
  if(allCategoryData.length == 0){
    return res.status(404).json({
      message :"There are no categories."
    })
    return
  }
  res.status(200).json({
    message :"All categories are fetched.",
    categories : allCategoryData || null
  })
}

const deleteCategory = async (req: IExtendedRequest, res: Response) => {
      const instituteNumber = req.user?.currentInstituteNumber
  const categoryId = req.params.id
  const categoryData = await sequelize.query(`SELECT *FROM category_${instituteNumber} where id=${categoryId}`,{
    type: QueryTypes.SELECT 
  }) 
  if (categoryData.length == 0) {
    return res.status(404).json({
      message: "No category found with that id."
    })
  }
  await sequelize.query(`DELETE FROM category_${instituteNumber} WHERE id = ${categoryId}`)
  res.status(200).json({
    message: "Category deleted successfully."
  })
}

const getSingleCategory = async (req: IExtendedRequest, res: Response) => {
  const instituteNumber = req.user?.currentInstituteNumber
  const categoryId = req.params.id
  const [categoryData] = await sequelize.query(`SELECT *FROM category_${instituteNumber} WHERE id= ${categoryId}`)
  if (categoryData.length == 0) {
    return res.status(404).json({
      message: "No category found with that id."
    })
    return
  }
  res.status(200).json({
    message: "Single course fetched.",
    courses: categoryData || []
  })
}

export{
  createCategory,
  getAllCategories,
  deleteCategory,
  getSingleCategory
}