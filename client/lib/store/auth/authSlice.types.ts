import { Status } from "@/lib/types/types"

export interface IUserData{
  username : string,
  token : string
}
export interface IRegisterData extends IUserData{
  email:string
}
export interface IInitialState{
  user : IUserData,
  status : Status

}