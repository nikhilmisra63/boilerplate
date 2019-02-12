const userFacade = require("./facade");
const accessTokenFacade = require("../accessTokens/facade");
const uid = require("uid2");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const authUtils = require("../../utils/auth");

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
    let user;
    let {
      username,
      firstName,
      lastName,
      email,
      email_status,
      phone_number
    } = req.body;
    const plainPassword = req.body.password;
    if (!username && !email && !plainPassword) {
      const error = new Error(res.__("common.invalid_data"));
      error.statusCode = 400;
      return next(error);
    }
    const hashedPassword = await authUtils.hashPassword(plainPassword);

    let password = hashedPassword;
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
    res
      .status(401)
      .json({
        message: "Email Verified"
      })
      .end();
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
        }
        if (
          !(await authUtils.matchPassword(req.body.password, user.password))
        ) {
          return res.status(401).json({
            message: "Email Or Password is incorrect"
          });
        } else {
          let token = generateToken(24);
          let userId = user.id;
          const pToken = await accessTokenFacade.create({
            token,
            userId
          });
          return res.send(pToken);
        }
      } else {
        return res.status(401).json({
          message: "Email Or Password is incorrect"
        });
      }
    } catch (e) {
      return next(e);
    }
  }

  async profile(token, res, next) {
    let auth;
    try {
      auth = await accessTokenFacade.findTempToken({
        where: { token }
      });
      if (auth === null) {
        return null;
      } else {
        return "Authenticated";

        // userData = await userFacade.profile({
        //   where: { id: auth.userId }
        // });
        // if (userData) {
        //   return userData;
        // } else {
        //   return "token Expire Please login again";
        // }
      }
    } catch (e) {
      return next();
    }
  }
  async me(req, res, next) {
    let user, id;
    id = req.headers["id"];
    try {
      user = await userFacade.profile({
        where: { id }
      });
    } catch (e) {
      return next(e);
    }
    res.send(user);
  }
}

module.exports = new UserController(userFacade);
