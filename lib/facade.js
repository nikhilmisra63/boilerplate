const Promise = require("bluebird");

class Facade {
  constructor(Schema) {
    this.Schema = Schema;
  }
  //create
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
  //update
  Update(body, where) {
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
  // findAll
  findAll(body) {
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
  //delete by id
  destroy(where) {
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
  // findBYID
  findById(id) {
    return new Promise((res, rej) => {
      this.Schema.findById(id)
        .then(result => {
          return res(result);
        })
        .catch(e => {
          return rej(e);
        });
    });
  }
}

module.exports = Facade;
