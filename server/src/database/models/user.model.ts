import { Table, Column, Model, DataType, PrimaryKey, Unique, } from "sequelize-typescript"

@Table({
  tableName: "users", //gui ma dekhiney table ko name
  modelName: "User", //project bhitra mathi ko table lai access gariney name
  timestamps: true
})

//class User sanga matra column banauney capacity hunna so we need to extend from Model
//class name ra model name same rakhda ramro 
class User extends Model {
  @Column({  //UUID ley hamro user ko id direct serially 1,2,3,4,... narakhera random kehi unpredictable rakhdinxa for security
    //UUID : universally unique identifier (128bit)
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4
  })
  declare id: string

  @Column({
    type: DataType.STRING
  })
  declare username: string

  @Column({
    type: DataType.STRING
  })
  declare password: string

  @Column({
    type: DataType.STRING,
    unique:true
  })
  declare email: string

  @Column({
    type: DataType.ENUM("teacher", "institute", "super-admin", "student"),
    defaultValue: "student"
  })
  declare role: string

  @Column({
    type: DataType.STRING
  })
  declare currentInstituteNumber: string
}

//note: if photo store garna xa db ma then string(url) ma basxa

export default User