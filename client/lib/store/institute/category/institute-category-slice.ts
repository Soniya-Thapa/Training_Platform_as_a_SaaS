import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICategoryAddData, ICategoryData, ICategoryInitialData } from "./institute-category-types";
import { Status } from "@/lib/types/types";
import { AppDispatch } from "../../store";
import APIWITHTOKEN from "@/lib/http/apiWithToken";

const initialState: ICategoryInitialData = {
  data: [],
  status: Status.LOADING
}
const categorySlice = createSlice({
  name: "categorySlice",
  initialState: initialState,
  reducers: {
    setStatus(state: ICategoryInitialData, action: PayloadAction<Status>) {
      state.status = action.payload
    },
    setFetchData(state: ICategoryInitialData, action: PayloadAction<ICategoryData[]>) {
      state.data = action.payload
    },
    setAddData(state: ICategoryInitialData, action: PayloadAction<ICategoryData>) {
      state.data.push(action.payload)
    },
    setCategoryDelete(state:ICategoryInitialData, action : PayloadAction<string>){
      const categoryId = action.payload
      //mathi ko data bhanney array ma , categoryId ko data vako ko index k xa, index find --> ani delete garnu paryo
      const index = state.data.findIndex((category)=>category.id == categoryId)
      if(index != -1){
        state.data.splice(index , 1)
      }
    }
  }
})
const { setStatus, setFetchData, setAddData , setCategoryDelete } = categorySlice.actions
export default categorySlice.reducer

export function fetchCategories() {
  return async function fetchCategoriesThunk(dispatch: AppDispatch) {
    try {
      const response = await APIWITHTOKEN.get("institute/category")
      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS))
        response.data.categories.length > 0 && dispatch(setFetchData(response.data.categories))
      } else {
        dispatch(setStatus(Status.ERROR))
      }
    } catch (error) {
      console.log(error)
      dispatch(setStatus(Status.ERROR))
    }
  }
}

export function addCategory(data : ICategoryAddData) {
  return async function addCategoryThunk(dispatch: AppDispatch) {
    try {
      const response = await APIWITHTOKEN.post("institute/category",data)
      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS))
        response.data.data && dispatch(setAddData(response.data.data))
      } else {
        dispatch(setStatus(Status.ERROR))
      }
    } catch (error) {
      console.log(error)
      dispatch(setStatus(Status.ERROR))
    }
  }
}

export function deleteCategory(id : string) {
  return async function deleteCategoryThunk(dispatch: AppDispatch) {
    try {
      const response = await APIWITHTOKEN.delete("institute/category/" + id)
      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS))
        dispatch(setCategoryDelete(id))
      } else {
        dispatch(setStatus(Status.ERROR))
      }
    } catch (error) {
      console.log(error)
      dispatch(setStatus(Status.ERROR))
    }
  }
}