
import axios from "axios"

const APIWITHTOKEN = axios.create({
  baseURL : "http://localhost:4000/api",
  headers : {
    "Content-Type" : "application/json", //frontend ley backend lai data kun format ma pathauxa is content type ra by default content type pani application/json nai hunxa (sending phase)
    "Accept" : "application/json" //in which format is the data received is accept (receiving phase)
  }
})
APIWITHTOKEN.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = token;
    }
  }
  return config;
});


export default APIWITHTOKEN