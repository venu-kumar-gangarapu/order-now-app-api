// //create a transporter
// //compose yor mail (sender,recipient,subjectand content)
// //send mail(transporter.sendMAil())
// const nodemailer = require("nodemailer");
// const transporter = nodemailer.createTransport({
//     host: "smtp.gmail.com",
//     port: 587,
//     secure: false,
//     auth: {
//         user: process.env.MAIL_USER,
//         pass: process.env.MAIL_PASS
//     },
//      family: 4
// });

// const sendMail = async (to,subject,userName)=>{
//     await transporter.sendMail({
//         from:process.env.MAIL_USER,
//         to,
//         subject,
//         html:  `
//         <div>
//             <h2>Welcome, ${userName}!</h2>
//             <p>Your account has been created successfully.</p>
//             <p>Thank you for joining <strong>Order Now</strong>.</p>
//         </div>
//     `
//     })
// }

const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendMail = async (to, userName) => {

    const { data, error } = await resend.emails.send({
        from: "Order Now <onboarding@resend.dev>",
        to: [to],
        subject: "Welcome to Order Now",
        replyTo: "venug16046@gmail.com",
        html: `
            <div style="
                max-width: 600px;
                margin: 0 auto;
                padding: 30px;
                font-family: Arial, sans-serif;
                background-color: #f5f5f5;
            ">

                <div style="
                    background-color: #ffffff;
                    padding: 30px;
                    border-radius: 12px;
                    text-align: center;
                ">

                    <h1 style="
                        color: #ff4b2b;
                        margin-bottom: 20px;
                    ">
                        Welcome, ${userName}! 🎉
                    </h1>

                    <p style="
                        color: #555;
                        font-size: 16px;
                        line-height: 1.6;
                    ">
                        Your Order Now account has been created successfully.
                    </p>

                    <p style="
                        color: #333;
                        font-size: 15px;
                    ">
                        Thank you for joining
                        <strong style="color: #ff4b2b;">
                            Order Now
                        </strong>.
                    </p>

                    <a
                        href="https://your-frontend-url.com"
                        style="
                            display: inline-block;
                            margin-top: 20px;
                            padding: 12px 24px;
                            background-color: #ff4b2b;
                            color: white;
                            text-decoration: none;
                            border-radius: 6px;
                            font-weight: bold;
                        "
                    >
                        Start Ordering
                    </a>

                    <p style="
                        margin-top: 30px;
                        color: #999;
                        font-size: 12px;
                    ">
                        © 2026 Order Now
                    </p>

                </div>
            </div>
        `
    });

    if (error) {
        console.error("Email error:", error);
        throw error;
    }

    return data;
};

module.exports = sendMail;