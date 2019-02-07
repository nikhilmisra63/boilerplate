const controller = require("./controller");
const Router = require("express").Router;
const router = new Router();

const apiAuth = async (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    console.log("hello token", bearerHeader);
    const user = await controller.profile(bearerHeader, res, next);
    if (user === null) {
      res.send("Token Expire");
    } else {
      res.send(user);
    }
  } else {
    res.sendStatus(401);
  }
};

router.route("/SignUp").post((...args) => controller.signUp(...args)); // CREATE User
router.route("/Login").post((...args) => controller.login(...args));
router
  .route("/ConfirmEmail/:token")
  .put((...args) => controller.emailVerfication(...args));

router.route("/Login/").get(apiAuth, (...args) => controller.profile(...args));

module.exports = router;
