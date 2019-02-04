const Facade = require("../../lib/facade");
const petSchema = require("./schema");

class PetFacade extends Facade {
  //update by username
  updateByPetName(body, where) {
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
  findByName(where) {
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
  deleteByName(where) {
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
  findAllWithUser(body) {
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
  findOneWithUser(body) {
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

module.exports = new PetFacade(petSchema);
