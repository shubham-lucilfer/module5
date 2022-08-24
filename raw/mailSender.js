const nodemailer = require("nodemailer");

const password = "unnrcvxyjkpmtqcp"

async function mainSender() {

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "mrjanuaryx@gmail.com", // generated ethereal user
      pass: password, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Chrollo 👻" <mrjanuaryx@gmail.com>', // sender address
    to: "mrjanuaryx@gmail.com", // list of receivers
    subject: "Hello ✔ Testing for FJP", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

mainSender ().catch(console.error);