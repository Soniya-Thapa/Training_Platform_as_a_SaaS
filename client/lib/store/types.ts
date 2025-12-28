export interface IInitialStudentData {
  data: string | null
}

export interface IUserInitialState {
  name: string | null,
  address: string | null
}

export interface IIncomingUserPayload {
  name: string | null,
  address: string | null,
  age : number | null
}