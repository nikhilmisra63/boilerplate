const Umzug = require("umzug");
const Sequelize = require("sequelize");
const _ = require("lodash");
const Promise = require("bluebird");

const options = {};
if (process.env.NODE_ENV === "test") options.force = true;

module.exports = app =>
  new Promise(async (res, rej) => {
    console.log("Boot script - Starting initdb");
    try {
      await sequelize.sync(options);
    } catch (e) {
      return rej(e);
    }
    console.log("Boot script - initialising umzug");
    const umzug = new Umzug({
      migrations: {
        params: [sequelize.getQueryInterface(), Sequelize],
        path: `${process.cwd()}/migrations`,
        pattern: /^\d+[\w-]+\.js$/
      },
      storage: "sequelize",
      storageOptions: {
        sequelize: sequelize
      }
    });
    console.log("Boot script - Running migrations");

    let migrations = await umzug.pending();
    migrations = _.map(migrations, "file");
    console.log(`Boot script - migrations ${migrations}`);
    try {
      console.log("Boot script - Running umzug migrations");
      await umzug.execute({
        migrations,
        method: "up"
      });
    } catch (e) {
      console.log(`Boot script - reject db config 2 ${e}`);
      return rej(e);
    }
    console.log("Boot script - Resolving initdb");
    return res();
  });
