const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "ysdaassgfyrxa5x7@ethereal.email",
    pass: "m6p1wwTcva5DSPBbzp"
  },
  tlsl: { rejectUnauthorized: false }
});

module.exports = {
  signUpEmail: async (user, token) => {
    const mailOptions = {
      from: "<ysdaassgfyrxa5x7@ethereal.email>",
      to: user.email,
      subject: `Email Verfication${token}`,
      text: `Verfication Token ${token}`,
      html: `<p>Click <a href=http://localhost:4000/User/ConfirmEmail/${token}>here</a> to confirm you email</p>`
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log(info);
    });
  },
  forgotPasswordEmail: async email => {
    const mailOptions = {
      from: "<ysdaassgfyrxa5x7@ethereal.email>",
      to: email,
      subject: `Forgot Password`,
      text: `Click on this link to change your password`,
      html: `<p>Click <a href=http://localhost:4000/User/ConfirmEmail/:email>here</a> to confirm you email</p>`
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log(info);
    });
  }
};
