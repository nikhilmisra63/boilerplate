const controller = require("./controller");
const Router = require("express").Router;
const router = new Router();

router.route("/").post((...args) => controller.create(...args)); // create user
router.route("/").get((...args) => controller.findAllUser(...args)); // find all User
router.route("/Pets").get((...args) => controller.findAllWithPets(...args)); // FIND ALL USER WITH PETS

router.route("/:id").put((...args) => controller.Update(...args)); // update User by id

router.route("/:id").get((...args) => controller.findById(...args)); // FIND USER BY USERNAME

router.route("/:id").delete((...args) => controller.destroy(...args)); //DELETE USER BY USERNAME
router
  .route("/UserName/:username")
  .put((...args) => controller.updateByUserName(...args)); // UPDATE USER BY USERNAME

router
  .route("/UserName/:username")
  .get((...args) => controller.findByUserName(...args)); // FIND USER WITH USERNAME
router
  .route("/UserName/:username")
  .delete((...args) => controller.deleteByUserName(...args)); // delete User by username

router.route("/Pets/:id").get((...args) => controller.findOneWithPets(...args)); // FIND ONE USER WITH PETS

module.exports = router;
