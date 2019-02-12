const asyncModule = require("async");
const Promise = require("bluebird");
const bcrypt = Promise.promisifyAll(require("bcrypt"));

const salt = 10;
const MAX_PASSWORD_LENGTH = 60;
const MIN_PASSWORD_LENGTH = 6;

module.exports = {
  hashPassword: password =>
    new Promise(async (resolve, reject) => {
      if (
        password.length < MIN_PASSWORD_LENGTH ||
        password.length > MAX_PASSWORD_LENGTH
      ) {
        const error = new Error("invalid length");
        error.statusCode = 400;
        return reject(error);
      }
      try {
        await bcrypt.hash(password, salt, (err, hash) => {
          resolve(hash);
        });
      } catch (e) {
        reject(e);
      }
    }),
  matchPassword: (plain, password) =>
    new Promise(async (resolve, reject) => {
      if (password && plain) {
        const isMatch = bcrypt.compareAsync(plain, password);
        resolve(isMatch);
      } else {
        resolve(false);
      }
    }),
  runPolicies(req, res, next) {
    const list = this;
    asyncModule.eachSeries(
      list,
      (policy, cb) => {
        require(`../policies/${policy}`)(req, res, next, cb);
      },
      (err, result) => {
        if (err) return next(err);

        const error = new Error("Unauthenticated");
        error.statusCode = 401;
        return next(error);
      }
    );
  }
};
