const controller = require("../model/user/controller");

module.exports = async function(req, res, next) {
  const userId = req.headers["userId"];
  const userToken = req.headers["authorization"];
  if (typeof userToken !== "undefined") {
    const user = await controller.profile(userToken, res, next);
    if (user === null) {
      return res
        .status(401)
        .json({
          message: "Unauthorized user not found"
        })
        .end();
    } else {
      next();
    }
  } else {
    return res
      .status(401)
      .json({
        message: "Unauthorized Token"
      })
      .end();
  }
};
