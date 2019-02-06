const Facade = require("../../lib/facade");
const accessTokenSchema = require("./schema");
class accessTokenFacade extends Facade {
  create(body) {
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
  findTempToken(where) {
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
  deleteTempToken(where) {
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
}

module.exports = new accessTokenFacade(accessTokenSchema);
