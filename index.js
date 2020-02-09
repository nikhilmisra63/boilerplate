const express = require("express");
const Sequelize = require("sequelize");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const config = require("config");
const path = require("path");
const serverUtils = require("./utils/serverUtils");

global.app = express();

app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("tiny"));

const db = config.get("db");
global.sequelize = new Sequelize(db.database, null, null, db.setting);
const routes = require("./routes");
const startApp = async () => {
  app.use("/", routes);
  require('./oAuth');
  app.use("/explorer", express.static(path.join(__dirname, "swagger")));
  app.listen(config.get("port"), () => {
    console.log(`Magic happens on port ${config.get("port")}`);
  });
};
console.log("starting app.....");
serverUtils.boot(app).then(
  () => {
    console.log(`Starting Server.....`);
    startApp();
  },
  err => {
    console.log(err);
  }
);

module.exports = app;
