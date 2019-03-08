const Promise = require("bluebird");
const fs = Promise.promisifyAll(require("fs"));


module.exports = {
  boot: app =>
    new Promise(async (resolve, reject) => {
      let bootDirPath = `${__dirname}/../boot`;
      const files = await fs.readdirAsync(bootDirPath);
      for (const file of files) {
        try {
          await require(`${bootDirPath}/${file}`)(app);
        } catch (e) {
          return reject(e);
        }
      }
      resolve();
    })
};
