const controller = require("./controller");
const Router = require("express").Router;
const router = new Router();

router.route("/").post((...args) => controller.create(...args)); // CREATE PET
router.route("/").get((...args) => controller.findAll(...args)); // FIND ALL PET

router.route("/User").get((...args) => controller.findAllWithUser(...args)); // FIND ALL PETS WITH USER

router.route("/:id").put((...args) => controller.Update(...args)); // UPDATE PET BY PET ID
router.route("/:id").get((...args) => controller.findById(...args)); // FIND PET BY PET ID
router.route("/:id").delete((...args) => controller.destroy(...args)); //DELETE PET BY PET ID

router
  .route("/Name/:name")
  .put((...args) => controller.updateByPetName(...args)); // UPDATE BY PETNAME
router.route("/Name/:name").get((...args) => controller.findByName(...args)); // FIND PET BY PETNAME
router
  .route("/Name/:name")
  .delete((...args) => controller.deleteByName(...args)); // DELETE PET BY PETNAME

router.route("/User").get((...args) => controller.findAllWithUser(...args)); // FIND ALL PETS WITH USER
router.route("/User/:id").get((...args) => controller.findOneWithUser(...args)); // FIND ONE PET WITH USER

module.exports = router;
