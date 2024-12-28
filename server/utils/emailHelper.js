const nodemailer = require("nodemailer");
const fs = require("fs");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config();

const {SENDGRID_API_KEY} = process.env

// #{otop} -> 1234 // creds -> {otp:1234, name:"John"}
function replaceContent(content, creds){
    const allKeysArr = Object.keys(creds);
    allKeysArr.forEach(function(key) {
        content = content.replace(new RegExp(`#{${key}}`, "g"), creds[key]);
    });
    return content;
}

async function EmailHelper(templateName, receiverEmail, creds){
    try {
        const templatePath = path.join(__dirname, "email_templates", templateName)
        console.log("Template Path:", templatePath); // Debug template path
        console.log("SENDGRID_API_KEY ", SENDGRID_API_KEY);
        let content = await fs.promises.readFile(templatePath, "utf-8");
        const emailDetails = {
            to:receiverEmail,
            from:"vishnucool569@gmail.com",
            subject: "Mail from vishnu ",
            text: `Hi ${creds.name} this is your reset otp ${creds.otp}`,
            html:replaceContent(content, creds)
        }
        console.log("Email details to: ", emailDetails.to);
        console.log("Email details from: ", emailDetails.from);

        const transportDetails = {
            host:"smtp.sendgrid.net",
            port: 587,
            auth:{
                user:"apikey",
                pass:SENDGRID_API_KEY
            }
        }
        const transpoter = nodemailer.createTransport(transportDetails)
        await transpoter.sendMail(emailDetails);
        console.log("Email sent successfully")
    } catch (error) {
        console.log(error)
    }
}

module.exports = EmailHelper;