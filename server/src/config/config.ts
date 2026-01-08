import {config} from "dotenv" //config is function given by dotenv
config()

export const envConfig = {
  portNumber : process.env.PORT || 5000,
  secretKey : process.env.JWT_SECRET,
  jwtExpire : process.env.JWT_EXPIRES_IN
}
