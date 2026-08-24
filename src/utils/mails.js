//create a transporter
//compose yor mail (sender,recipient,subjectand content)
//send mail(transporter.sendMAil())
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    },
     family: 4
});

const sendMail = async (to,subject,userName)=>{
    await transporter.sendMail({
        from:process.env.MAIL_USER,
        to,
        subject,
        html:  `
        <div>
            <h2>Welcome, ${userName}!</h2>
            <p>Your account has been created successfully.</p>
            <p>Thank you for joining <strong>Order Now</strong>.</p>
        </div>
    `
    })
}

module.exports = sendMail;