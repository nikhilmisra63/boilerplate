const Router = require("express").Router;
const controller = require("./model/user/controller");
const router = new Router();
const authUtils = require("./utils/auth");

const customer = require("./model/customer/router");
const pets = require("./model/pet/router");
const user = require("./model/user/router");
const accessToken = require("./model/accessTokens/router");

router.route("/").get((req, res) => {
  res.json({ message: "Welcome to example-api API!" });
});
router.use(
  "/Customers",
  authUtils.runPolicies.bind(["isAuthenticated"]),
  customer
);
router.use("/Pets",authUtils.runPolicies.bind(["isAuthenticated"]), pets);
router.use("/User", user);
router.use("/AccessToken", accessToken);

module.exports = router;
