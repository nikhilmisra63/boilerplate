const controller = require("./controller");
const Router = require("express").Router;
const router = new Router();
router.route("/").post((...args) => controller.create(...args)); // CREATE accessToken

module.exports = router;
