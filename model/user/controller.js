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
                  message: "Login Faild"
                });
              }
              if (result) {
                let token = generateToken(24);
                let userId = user.id;
                const pToken = await accessTokenFacade.create({
                  token,
                  userId
                });
                return res.send(pToken);
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

  async profile(token, res, next) {
    let userData, auth;
    try {
      auth = await accessTokenFacade.findTempToken({
        where: { token: token }
      });
      if (auth === null) {
        res.send("wrong Token");
      } else {
        userData = await userFacade.profile({
          where: { id: auth.userId }
        });
        if (userData) {
          return userData;
        } else {
          return "token Expire Please login again";
        }
      }
    } catch (e) {
      return next();
    }
  }
}

module.exports = new UserController(userFacade);
