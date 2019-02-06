const Router = require("express").Router;
const router = new Router();

const customer = require("./model/customer/router");
const pets = require("./model/pet/router");
const user = require("./model/user/router");
const accessToken = require("./model/accessTokens/router");

router.route("/").get((req, res) => {
  res.json({ message: "Welcome to example-api API!" });
});
router.use("/Customers", customer);
router.use("/Pets", pets);
router.use("/User", user);
router.use("/AccessToken", accessToken);

module.exports = router;
