const Facade = require("../../lib/facade");
const userSchema = require("./schema");
class userFacade extends Facade {
  signUp(body) {
    return new Promise((res, rej) => {
      this.Schema.create(body)
        .then(result => {
          return res(result);
        })
        .catch(e => {
          return rej(e);
        });
    });
  }
  login(body) {
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
  emailVerfication(body, where) {
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
  profile(where) {
    return new Promise((res, rej) => {
      this.Schema.findOne(where)
        .then(result => {
          return res(result);
        })
        .catch(e => {
          return rej(e);
        });
    });
  }
}

module.exports = new userFacade(userSchema);
