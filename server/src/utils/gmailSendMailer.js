import nodemailer from 'nodemailer';

let transporter = nodemailer.createTransport({
  service: 'gmail',
  port: 587,
  secure: true,
  auth: {
    user: process.env.NODEMAILER_EMAIL, 
    pass: process.env.NODEMAILER_PASSWORD 
  }
});

const gmailSendMailer = async(to, hash) => {
    try {
        await transporter.sendMail({
            from: process.env.NODEMAILER_EMAIL, 
            to: to,
            subject: 'Пример отправки сообщения с помощью Nodemailer',
            text: '',
            html: `<div><h1>Follow the link to verify your email address</h1><a href="http://localhost:3000/verify?hash=${hash}">http://localhost:3000/verify?hash=${hash}</a></div>`
        });
    } catch (error) {
        console.log(error);
    }
}


export default gmailSendMailer;