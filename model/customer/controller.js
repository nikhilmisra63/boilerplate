const customerFacade = require("./facade");

class customerController {
  // create customer
  async create(req, res, next) {
    const {
      customername,
      firstName,
      lastName,
      email,
      age,
      address,
      phone_number
    } = req.body;
    let customer;
    try {
      customer = await customerFacade.create({
        customername,
        firstName,
        lastName,
        email,
        age,
        address,
        phone_number
      });
    } catch (e) {
      return next(e);
    }
    res.send(customer);
  }
  //update customer
  async Update(req, res, next) {
    const {
      customername,
      firstName,
      lastName,
      email,
      age,
      address,
      phone_number
    } = req.body;
    let updatedCustomer;
    try {
      updatedCustomer = await customerFacade.Update(
        {
          customername,
          firstName,
          lastName,
          email,
          age,
          address,
          phone_number
        },
        {
          where: {
            id: req.params.id
          }
        }
      );
    } catch (e) {
      return next(e);
    }
    res.send(updatedCustomer);
  }
  //find all
  async findAllCustomer(req, res, next) {
    let showCustomer;
    try {
      showCustomer = await customerFacade.findAll();
    } catch (e) {
      return next(e);
    }
    res.send(showCustomer);
  }
  //delete by id
  async destroy(req, res, next) {
    let d;
    try {
      await customerFacade.destroy({
        where: { id: req.params.id }
      });
    } catch (e) {
      console.log(e);
      return next(e);
    }
    res.end("Customer Deleted");
  }

  // show records by ID
  async findById(req, res, next) {
    const id = req.params.id;
    let findId;
    try {
      findId = await customerFacade.findById(id);
    } catch (e) {
      return next(e);
    }
    res.send(findId);
  }
  // show records by customerName
  async findByCustomerName(req, res, next) {
    let findCustomerName;
    try {
      findCustomerName = await customerFacade.findByCustomerName({
        where: {
          customername: req.params.customername
        }
      });
    } catch (e) {
      return next(e);
    }
    res.send(findCustomerName);
  }
  //update by customername
  async updateByCustomerName(req, res, next) {
    const {
      customername,
      firstName,
      lastName,
      email,
      age,
      address,
      phone_number
    } = req.body;
    let updatedCustomer;
    try {
      updatedCustomer = await customerFacade.updateByCustomerName(
        {
          customername,
          firstName,
          lastName,
          email,
          age,
          address,
          phone_number
        },
        {
          where: {
            customername: req.params.customername
          }
        }
      );
    } catch (e) {
      return next(e);
    }
    res.send(updatedCustomer);
  }
  // DELETE CUSTOMER BY CUSTOMERNAME
  async deleteByCustomerName(req, res, next) {
    try {
      await customerFacade.deleteByCustomerName({
        where: { customername: req.params.customername }
      });
    } catch (e) {
      console.log(e);
      return next(e);
    }
    res.send("deleted");
  }

  //find all with pets
  async findAllWithPets(req, res, next) {
    let customers;
    const { id } = req.params;
    try {
      customers = await customerFacade.findAllWithPets({
        where: {},
        include: ["pets"]
      });
    } catch (e) {
      return next(e);
    }
    res.send(customers);
  }
  //find customer With Pets BY ID
  async findOneWithPets(req, res, next) {
    let customer;
    const { id } = req.params;
    try {
      customer = await customerFacade.findOneWithPets({
        where: { id },
        include: ["pets"]
      });
    } catch (e) {
      return next(e);
    }
    res.send(customer);
  }
}

module.exports = new customerController(customerFacade);
