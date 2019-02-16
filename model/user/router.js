const controller = require("./controller");
const authUtils = require("../../utils/auth");
const Router = require("express").Router;
const router = new Router();

router.route("/SignUp").post((...args) => controller.signUp(...args));
router.route("/Login").post((...args) => controller.login(...args));
router
  .route("/ConfirmEmail/:token")
  .put((...args) => controller.emailVerfication(...args));

router
  .route("/Login/me")
  .get(authUtils.runPolicies.bind(["isAuthenticated"]), (...args) =>
    controller.me(...args)
  );
router
  .route("/Login/forgotPassword")
  .get((...args) => controller.forgotPassword(...args));

module.exports = router;
