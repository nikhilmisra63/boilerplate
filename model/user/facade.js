const Facade = require("../../lib/facade");
const userSchema = require("./schema");

class UserFacade extends Facade {
  //update by username
  updateByUserName(body, where) {
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
  //find user by username
  findByUserName(where) {
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
  // delete user by user name
  deleteByUserName(where) {
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

module.exports = new UserFacade(userSchema);
