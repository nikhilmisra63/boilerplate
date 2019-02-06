const Sequelize = require("sequelize");

const user = {
  id: {
    type: Sequelize.BIGINT,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: Sequelize.STRING,
    unique: true,
    required: true,
    validate: {
      len: {
        args: [3, 20],
        msg: "Min length of the username is 5 and max 20"
      }
    }
  },
  firstName: { type: Sequelize.STRING, required: true },
  lastName: { type: Sequelize.STRING },
  password: { type: Sequelize.STRING, require: true },
  email: {
    type: Sequelize.STRING,
    unique: true,
    required: true,
    validate: { isEmail: true }
  },
  email_status: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false
  },
  phone_number: { type: Sequelize.STRING, allowNull: false, unique: true },
  createdAt: {
    allowNull: false,
    type: Sequelize.DATE
  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE
  }
};

const userSchema = sequelize.define("user", user, {
  freezeTableName: true
});

module.exports = userSchema;
const accessTokenSchema = require("../accessTokens/schema");
userSchema.hasMany(accessTokenSchema, { as: "token", sourceKey: "id" });
