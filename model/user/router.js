const controller = require("./controller");
const Router = require("express").Router;
const router = new Router();
router.route("/SignUp").post((...args) => controller.signUp(...args)); // CREATE User
router.route("/Login").get((...args) => controller.login(...args));
router
  .route("/ConfirmEmail/:token")
  .put((...args) => controller.emailVerfication(...args));

module.exports = router;
