import nodemailer from "nodemailer";
import { google } from 'googleapis';
const handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");




const CLIENT_ID = '558857598441-04dml5pnst2o88mdp0mtsilgvj58j8g2.apps.googleusercontent.com';
const CLIENT_SECRET='mLvoocmdxP0DrD9Cnf0dnwPK';
const REDIRECT_URI='https://developers.google.com/oauthplayground';
const OAuth2Client = new google.auth.OAuth2(
    CLIENT_ID ,
CLIENT_SECRET,
REDIRECT_URI
);

const clientId =
  "558857598441-04dml5pnst2o88mdp0mtsilgvj58j8g2.apps.googleusercontent.com";
const clientSecret = "mLvoocmdxP0DrD9Cnf0dnwPK";

const refreshToken = "1//0460Yo88VWw4ECgYIARAAGAQSNwF-L9IrHtsgSvD68fpICOysvNN1ThTJN-GRoq2jVu8MpzQHURru_eduTNRlgS-rOyl2Ri_XGdY"
OAuth2Client.setCredentials({
  refresh_token: refreshToken,
});

async function sendEmail(
  userEmail:string, subject:string, payload:{}, template:string
) {
    try {
      const source = fs.readFileSync(path.join(__dirname, template), "utf8");
      const compiledTemplate = handlebars.compile(source);
    const accessToken = await OAuth2Client.getAccessToken();
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        type: "OAuth2",
        user: "roluwafunbi@gmail.com",
        clientId: clientId,
        clientSecret: clientSecret,
        refreshToken: refreshToken,
        accessToken: accessToken as string,
      },
    });
    const mailOptions = {
      from: "roluwafunbi@gmail.com",
      to: userEmail,
      subject: subject,
      payload: payload,
      html: compiledTemplate(payload),
    };
    const result = await transporter.sendMail(mailOptions);
    return result;
  } catch (error) {
    return error;
  }
}

export default sendEmail;