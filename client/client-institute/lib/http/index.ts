// import axios from "axios"

// //creating axios constant, because everytime you import axios in the new file , you get new axios without previous data. so throughout the project if you want to use same axios then create this file 
// const API = axios.create({
//   baseURL : "http://localhost:4000/api",
//   headers : {
//     "Content-Type" : "application/json", //frontend ley backend lai data kun format ma pathauxa is content type ra by default content type pani application/json nai hunxa (sending phase)
//     "Accept" : "application/json" //in which format is the data received is accept (receiving phase)
//   }
// })

// const APIWITHTOKEN = axios.create({
//   baseURL : "http://localhost:4000/api",
//   headers : {
//     "Authorization":localStorage.getItem("token"),
//     "Content-Type" : "application/json", //frontend ley backend lai data kun format ma pathauxa is content type ra by default content type pani application/json nai hunxa (sending phase)
//     "Accept" : "application/json" //in which format is the data received is accept (receiving phase)
//   }
// })

// export {
//   API,
//   APIWITHTOKEN
// }