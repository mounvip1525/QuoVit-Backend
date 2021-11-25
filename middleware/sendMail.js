import nodemailer from "nodemailer";
let fromMail = 'mounvip1525@gmail.com';
let toMail = 'vitquovit@gmail.com';

let subject  = 'An email using nodejs app';
let text = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book." 

// auth
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'vitquovit@gmail.com',
        pass: 'quovit@123'
    }
});

// email options
let mailOptions = {
    from: fromMail,
    to: toMail,
    subject: subject,
    text: text
};
const sendMail = (req,res) => {
    try{
        send()
        res.status(200).send("sent success")
    } catch(err){
        console.log(err)
        res.status(500).send(err)
    }
}
// send email
const send = transporter.sendMail(mailOptions, (error, response) => {
    if (error) {
        console.log(err)
    } else {
        console.log(response)
    }
});

export default sendMail