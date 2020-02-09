const Facade = require("../../lib/facade");
const customerSchema = require("./schema");

class customerFacade extends Facade {}

module.exports = new customerFacade(customerSchema);
