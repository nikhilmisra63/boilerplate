const Facade = require("../../lib/facade");
const customerSchema = require("./schema");

class customerFacade extends Facade {
  //update by customername
  updateByCustomerName(body, where) {
    return new Promise((res, rej) => {
      this.Schema.update(body, where)
        .then(result => {
          return res(result);
        })
        .catch(e => {
          return rej(e);
        });
    });
  }
  //find customer by customername
  findByCustomerName(where) {
    return new Promise((res, rej) => {
      this.Schema.findAll(where)
        .then(result => {
          return res(result);
        })
        .catch(e => {
          return rej(e);
        });
    });
  }
  // delete customer by customer name
  deleteByCustomerName(where) {
    return new Promise((res, rej) => {
      this.Schema.destroy(where)
        .then(result => {
          return res(result);
        })
        .catch(e => {
          return rej(e);
        });
    });
  }

  findAllWithPets(body) {
    return new Promise((res, rej) => {
      this.Schema.findAll(body)
        .then(result => {
          return res(result);
        })
        .catch(e => {
          return rej(e);
        });
    });
  }
  findOneWithPets(body) {
    return new Promise((res, rej) => {
      this.Schema.findOne(body)
        .then(result => {
          return res(result);
        })
        .catch(e => {
          return rej(e);
        });
    });
  }
}

module.exports = new customerFacade(customerSchema);
