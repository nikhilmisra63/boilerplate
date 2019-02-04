const Router = require("express").Router;
const router = new Router();

const users = require("./model/user/router");
const pets = require("./model/pet/router");

router.route("/").get((req, res) => {
  res.json({ message: "Welcome to example-api API!" });
});
router.use("/Users", users);
router.use("/Pets", pets);

module.exports = router;
