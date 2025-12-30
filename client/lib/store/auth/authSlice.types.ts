import { Status } from "@/lib/types/types"

export interface IUserData{
  username : string,
  password : string
}
export interface IInitialState{
  user : IUserData,
  status : Status

}