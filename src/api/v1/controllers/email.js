const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

const host = process.env.SMTP_HOST;
const port = process.env.SMTP_PORT;
const user = process.env.SMTP_USER;
const pass = process.env.SMTP_PASS;


const emailSender = async (req,res) => {
    // username: support@cryptomaluinvestment.com
        // pwd: D37F4CC6555CE47D00B9D3B7B78E0085A682
        // port: 2525

    const {sender, email, body, subject} = req.body;
    // var transporter = nodemailer.createTransport({
    //     service: 'gmail',
    //     auth: {
    //         user: 'johnnydoe16161616@gmail.com',
    //         pass: 'Stephendoe16'
    //     }
    // });
    // let transporter = nodemailer.createTransport({
    //     host: "in-v3.mailjet.com",
    //     port: 587,
    //     secure: false, // upgrade later with STARTTLS
    //     auth: {
    //         user: "fcad925b86c6bf2cd57e06ea329dad43",
    //         pass: "ba813bbc3cc5e9af96665cdf8766aeee",
    //         },
    // });
    
    const mailOptions = {
        from: sender,
        to: email,
        subject: subject,
        text: body,
    }
    console.log(host, port, user, pass);

    let transporter = nodemailer.createTransport({
        host: host,
        port: port,
        // secure: true, // upgrade later with STARTTLS
        auth: {
            user: user,
            pass: pass,
            },
        tls: {
            ciphers: 'SSLv3',
            minVersion: 'TLSv1.2'
        }
    });

    transporter.verify(function (error, success) {
        if (error) {
            console.log("Verify error: " + error);
            res.send(error);
        } else {
            console.log("Server is ready to take our messages");

            // Sending email
            transporter.sendMail(mailOptions, (error, info) =>{
                if (error){
                    res.send("Error sending mail "+error);
                }else {
                    console.log("Email sent: " + info.response);
                    res.send("Email sent");
                }
            });
        }
    });

    // res.send("THis is the email sending function " +name);
};

module.exports = emailSender;