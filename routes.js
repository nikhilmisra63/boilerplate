const Router = require("express").Router;
const userController = require("./model/user/controller");
const router = new Router();

const customer = require("./model/customer/router");
const pets = require("./model/pet/router");
const user = require("./model/user/router");
const accessToken = require("./model/accessTokens/router");
function apiAuth(req, res, next) {
  console.log("hello token");
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    console.log("hello token", bearerHeader);
    next();
  } else {
    res.sendStatus(403);
  }
}

router.route("/").get((req, res) => {
  res.json({ message: "Welcome to example-api API!" });
});
router.use("/Customers", customer);
router.use("/Pets", pets);
router.use("/User", user);
router.use("/AccessToken", accessToken);

module.exports = router;
