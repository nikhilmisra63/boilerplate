const userFacade = require("./facade");
const accessTokenFacade = require("../accessTokens/facade");
const uid = require("uid2");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

function generateToken(number) {
  return uid(number);
}

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "ysdaassgfyrxa5x7@ethereal.email",
    pass: "m6p1wwTcva5DSPBbzp"
  },
  tlsl: { rejectUnauthorized: false }
});

class UserController {
  async signUp(req, res, next) {
    let {
      username,
      firstName,
      lastName,
      email,
      email_status,
      phone_number
    } = req.body;
    let user;
    await bcrypt.hash(req.body.password, 10, async (err, password) => {
      if (err) {
        return res.send(err);
      } else {
        try {
          user = await userFacade.signUp({
            username,
            firstName,
            lastName,
            email,
            password,
            email_status,
            phone_number
          });
          let token = generateToken(24);
          let userId = user.id;
          await accessTokenFacade.create({
            token,
            userId
          });
          const mailOptions = {
            from: "<ysdaassgfyrxa5x7@ethereal.email>", // sender address
            to: user.email, // list of receiver
            subject: `Email Verfication${token}`, // Subject line
            text: `Verfication Token ${token}`, // plain text body
            html: `<p>Click <a href=http://localhost:4000/User/ConfirmEmail/${token}>here</a> to confirm you email</p>`
          };
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              return console.log(error);
            }
            console.log(info);
          });
        } catch (e) {
          return next(e);
        }
        res.send(user);
      }
    });
  }

  async emailVerfication(req, res, next) {
    let email_status = true;
    try {
      const user = await accessTokenFacade.findTempToken({
        where: { token: req.params.token }
      });
      if (user === null) {
        res.end("Wrong Token");
      } else {
        await userFacade.emailVerfication(
          {
            email_status
          },
          { where: { id: user.userId } }
        );
        await accessTokenFacade.deleteTempToken({
          where: { token: req.params.token }
        });
      }
    } catch (e) {
      return next(e);
    }
    res.end("Email Verified");
  }

  //login
  async login(req, res, next) {
    let user;
    try {
      user = await userFacade.login({
        where: { email: req.body.email }
      });
      if (user) {
        if (user.email_status === false) {
          res.end("please confirm you email first");
        } else {
          bcrypt.compare(
            req.body.password,
            user.password,
            async (err, result) => {
              if (err) {
                return res.status(401).json({
                  message: "Auth Faild"
                });
              }
              if (result) {
                let token = generateToken(24);
                let userId = user.id;
                await accessTokenFacade.create({
                  token,
                  userId
                });
                return res.status(200).json({
                  message: "Auth Sucessfull"
                });
              }
            }
          );
        }
      } else {
        res.end("Email or Password is Incorrect");
      }
    } catch (e) {
      return next(e);
    }
  }
}
module.exports = new UserController(userFacade);
