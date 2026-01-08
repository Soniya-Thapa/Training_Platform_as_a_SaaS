import { Sequelize } from "sequelize-typescript"
import { config } from "dotenv" //config is function given by dotenv
config()

const sequelize = new Sequelize({
  database: process.env.DB_DATABASE,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  dialect: "mysql",     // k database use garna aateko bhanney kura
  port: Number(process.env.DB_PORT),  // port number hunu parxa tara process.env garexi string ma basxa. so we need to convert
  models: [__dirname + "/models"] //current location + models location (models =  folder name) if this line is not written then the tables and columns are not formed. 
})

sequelize.authenticate()
  .then(() => {
    console.log("database connected")
  })
  .catch((error) => {
    console.log("error:", error)
  })

//after writing the db code, and adding the location now we need to migrate 
//Without migration → only your code knows about changes.
//With migration → your database actually updates, and everyone stays in sync.

sequelize.sync({
  alter: false //if we do force:true then all the previous data will get lost
})
  .then(() => {
    console.log("migrate successfully")
  })

export default sequelize