const userFacade = require("./facade");
const accessTokenFacade = require("../accessToken/facade");
const uid = require("uid2");
const authUtils = require("../../utils/auth");
const emailService = require("../../utils/email");

function generateToken(number) {
  return uid(number);
}

class UserController {
  //SignUp
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
      await emailService.signUpEmail(user, token);
    } catch (e) {
      return next(e);
    }
    res.send(user);
  }

  // Email Verfication
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

  //Login
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

  async isAuthenticated(token, res, next) {
    let auth;
    try {
      auth = await accessTokenFacade.findTempToken({
        where: { token }
      });
      if (auth === null) {
        return null;
      } else {
        return "Authenticated";
      }
    } catch (e) {
      return next();
    }
  }
  async me(req, res, next) {
    let user, id;
    id = req.headers["id"];
    try {
      user = await userFacade.findById({
        where: { id }
      });
    } catch (e) {
      return next(e);
    }
    res.send(user);
  }
  async forgotPassword(req, res, next) {
    let user, hashedPassword, password;
    let email = req.body.email;
    try {
      await emailService.forgotPasswordEmail(email);
      hashedPassword = await authUtils.hashPassword(plainPassword);
      password = hashedPassword;
      user = await userFacade.Update({ password }, { where: { email } });
    } catch (e) {
      return next(e);
    }
    res.send(user);
  }
}

module.exports = new UserController(userFacade);
