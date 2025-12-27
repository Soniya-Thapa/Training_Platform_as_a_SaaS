//alternate for nodemailer : sendgrid

import nodemailer from "nodemailer"

interface IMailInformation {
  to : string, 
  subject : string, 
  text : string
}
const sendMail = async (mailInformation:IMailInformation)=>{
  //logic for sending mails:
  //step 1: create nodemailer transport: transporter / transport : configuration setup
  const transporter = nodemailer.createTransport({
    service : "gmail", //purpose ,it means hami mail haru gmail ma pathauxam. if abc@yahoo.com ma mail garna xa bhani tyo jadaina 
    auth : { //sender ko gmail / password 
      user : process.env.NODEMAILER_GMAIL,
      pass: process.env.NODEMAILER_PASSWORD //this is not the real password, it is app password.
      //new tab -> google icon -> manage accounts -> search icon -> app password search -> app security 
    }
  })
  const mailFormatObject = {
    from :"SaaS MERN <ayinos.apaht143@gmail.com>",
    to: mailInformation.to,
    subject:mailInformation.subject,
    html: mailInformation.text //body
  }
  try {
    await transporter.sendMail (mailFormatObject)
  } catch (error) {
    console.log("Error : ", error )
  }
}
export default sendMail