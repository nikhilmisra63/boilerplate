const controller = require("./controller");
const Router = require("express").Router;
const router = new Router();

router.route("/").post((...args) => controller.create(...args)); // create customer
router.route("/").get((...args) => controller.findAllCustomer(...args)); // find all customer
router.route("/Pets").get((...args) => controller.findAllWithPets(...args)); // FIND ALL customer WITH PETS

router.route("/:id").put((...args) => controller.Update(...args)); // update customer by id

router.route("/:id").get((...args) => controller.findById(...args)); // FIND customer BY customerNAME

router.route("/:id").delete((...args) => controller.destroy(...args)); //DELETE customer BY customerNAME
router
  .route("/CustomerName/:customername")
  .put((...args) => controller.updateByCustomerName(...args)); // UPDATE customer BY customerNAME

router
  .route("/CustomerName/:customername")
  .get((...args) => controller.findByCustomerName(...args)); // FIND customer WITH customerNAME
router
  .route("/CustomerName/:customername")
  .delete((...args) => controller.deleteByCustomerName(...args)); // delete customer by customername

router.route("/Pets/:id").get((...args) => controller.findOneWithPets(...args)); // FIND ONE customer WITH PETS

module.exports = router;
