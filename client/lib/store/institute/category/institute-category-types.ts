import { Status } from "@/lib/types/types"

export interface ICategoryAddData{
  categoryName: string,
  categoryDescription: string,
}

export interface ICategoryData extends ICategoryAddData{
  id: string,
  createdAt: string
}

export interface ICategoryInitialData {
  data: ICategoryData[],
  status: Status
}